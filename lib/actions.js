"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

// Helper to handle local file uploads
async function saveFile(file, category) {
  if (!file || typeof file === "string") return file; // Skip if it's already a URL

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "public", "uploads", category);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = path.join(uploadsDir, filename);
  
  await writeFile(filePath, buffer);
  return `/uploads/${category}/${filename}`;
}

// --- HERO ACTIONS ---
export async function getHeroData() {
  return db.prepare('SELECT * FROM hero WHERE id = 1').get();
}

export async function updateHero(formData) {
  const headline = formData.get("headline");
  const subtext = formData.get("subtext");
  const videoFile = formData.get("videoFile");

  let video_url = formData.get("currentVideoUrl");
  if (videoFile && videoFile.size > 0) {
    video_url = await saveFile(videoFile, "hero");
  }

  db.prepare(`
    UPDATE hero 
    SET headline = ?, subtext = ?, video_url = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = 1
  `).run(headline, subtext, video_url);

  revalidatePath("/");
  return { success: true };
}

// --- GALLERY ACTIONS ---
export async function getGalleryData() {
  return db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
}

export async function addGalleryItem(formData) {
  const title = formData.get("title");
  const category = formData.get("category");
  const type = formData.get("type");
  const file = formData.get("file");
  const posterFile = formData.get("posterFile");

  const src = await saveFile(file, "gallery");
  let poster = null;
  if (posterFile && posterFile.size > 0) {
    poster = await saveFile(posterFile, "gallery/posters");
  }

  db.prepare(`
    INSERT INTO gallery (src, title, category, type, poster) 
    VALUES (?, ?, ?, ?, ?)
  `).run(src, title, category, type, poster);

  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGalleryItem(id) {
  const item = db.prepare('SELECT src, poster FROM gallery WHERE id = ?').get(id);
  
  // Optional: Delete physical files
  try {
    if (item.src) fs.unlinkSync(path.join(process.cwd(), "public", item.src));
    if (item.poster) fs.unlinkSync(path.join(process.cwd(), "public", item.poster));
  } catch (e) { console.error("Could not delete physical file", e); }

  db.prepare('DELETE FROM gallery WHERE id = ?').run(id);
  
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function updateGalleryItem(id, formData) {
  const title = formData.get("title");
  const category = formData.get("category");

  db.prepare(`
    UPDATE gallery 
    SET title = ?, category = ? 
    WHERE id = ?
  `).run(title, category, id);

  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

// --- SERVICES ACTIONS ---
export async function getServicesData() {
  return db.prepare('SELECT * FROM services ORDER BY order_index ASC').all();
}

export async function addService(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const icon_name = formData.get("icon_name");
  const imageFile = formData.get("imageFile");

  const image_src = await saveFile(imageFile, "services");

  db.prepare(`
    INSERT INTO services (title, description, icon_name, image_src) 
    VALUES (?, ?, ?, ?)
  `).run(title, description, icon_name, image_src);

  revalidatePath("/");
  return { success: true };
}

export async function updateService(id, formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const icon_name = formData.get("icon_name");
  const imageFile = formData.get("imageFile");

  let image_src = formData.get("currentImageSrc");
  if (imageFile && imageFile.size > 0) {
    image_src = await saveFile(imageFile, "services");
  }

  db.prepare(`
    UPDATE services 
    SET title = ?, description = ?, icon_name = ?, image_src = ? 
    WHERE id = ?
  `).run(title, description, icon_name, image_src, id);

  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id) {
  const item = db.prepare('SELECT image_src FROM services WHERE id = ?').get(id);
  
  if (item && item.image_src) {
    try {
      fs.unlinkSync(path.join(process.cwd(), "public", item.image_src));
    } catch (e) { console.error("Could not delete physical service image", e); }
  }

  db.prepare('DELETE FROM services WHERE id = ?').run(id);
  
  revalidatePath("/");
  return { success: true };
}
