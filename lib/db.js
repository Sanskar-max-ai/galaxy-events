import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'galaxy.db');
const db = new Database(dbPath);

// Initialize schemas
db.exec(`
  CREATE TABLE IF NOT EXISTS hero (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    video_url TEXT,
    headline TEXT,
    subtext TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT NOT NULL,
    title TEXT,
    category TEXT,
    type TEXT DEFAULT 'image',
    poster TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    image_src TEXT,
    order_index INTEGER DEFAULT 0
  );
`);

// Seed initial data if tables are empty
const heroCount = db.prepare('SELECT COUNT(*) as count FROM hero').get().count;
if (heroCount === 0) {
  db.prepare(`
    INSERT INTO hero (id, video_url, headline, subtext)
    VALUES (1, '/videos/hero-main.mp4', 'Where Every Moment Becomes a Memory', 'Galaxy Premium Service')
  `).run();
}

const serviceCount = db.prepare('SELECT COUNT(*) as count FROM services').get().count;
if (serviceCount === 0) {
  const initialServices = [
    { title: "Premium Weddings", icon: "FaGem", desc: "End-to-end luxury wedding planning and execution.", image: "/photos/wedding-stage.jpg" },
    { title: "Sangeet Management", icon: "FaMusic", desc: "Choreography, staging, and musical extravagance.", image: "/photos/wedding-2.jpg" },
    { title: "SFX & Fireworks", icon: "FaFire", desc: "Spectacular pyrotechnics and safe cold fireworks stage entry.", image: "/photos/fireworks-array.jpg" },
    { title: "Venue Decor", icon: "FaLeaf", desc: "Floral arrangements, thematic drapes, and ambient lighting.", image: "/photos/haldi-mehndi-decor.jpg" },
    { title: "Cinematic Photography", icon: "FaCamera", desc: "Capturing your best moments with high-end equipment.", image: "/photos/wedding-4.jpg" },
    { title: "Birthday Celebrations", icon: "FaGlassCheers", desc: "Themed birthday parties for kids and adults alike.", image: "/photos/birthday-celebrations.jpg" },
  ];
  
  const insertService = db.prepare('INSERT INTO services (title, icon_name, description, image_src, order_index) VALUES (?, ?, ?, ?, ?)');
  initialServices.forEach((s, idx) => {
    insertService.run(s.title, s.icon, s.desc, s.image, idx);
  });
}

const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
if (galleryCount === 0) {
  const initialGallery = [
    { src: "/photos/wedding-stage.jpg", title: "The Royal Stage", category: "Weddings", type: "image" },
    { src: "/photos/wedding-1.png", title: "Palace Mandap", category: "Weddings", type: "image" },
    { src: "/videos/hero-main.mp4", title: "Signature Entry", category: "Weddings", type: "video", poster: "/photos/wedding-stage.jpg" },
    { src: "/photos/wedding-3.jpg", title: "Sangeet Night", category: "Weddings", type: "image" },
    // ... add more as needed
  ];
  
  const insertGallery = db.prepare('INSERT INTO gallery (src, title, category, type, poster) VALUES (?, ?, ?, ?, ?)');
  initialGallery.forEach(item => {
    insertGallery.run(item.src, item.title, item.category, item.type, item.poster || null);
  });
}

export default db;
