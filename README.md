# CSI205 — Combined Front-End Project

รวมโค้ดจากโฟลเดอร์ `todos` เข้ากับ `merged-app` (React + Vite)

## วิธีเปิดใน VS Code
1. เปิดโฟลเดอร์ `merged-app` ด้วย VS Code
2. เปิด Terminal แล้วรัน `npm install`
3. รัน `npm run dev` แล้วเปิด URL ที่ Vite แสดง

## เมนูและฟังก์ชัน
- **Home**: โปรไฟล์ ทักษะ ข้อมูลติดต่อ
- **Calculator**: + − × ÷, %, √, 1/x, +/-, DEL, CE, Memory (MC/MR/M+/M-)
- **Animation**: สนามพื้นไม้ (canvas) + Play/Pause และเลือกวัตถุ None / Basketball / Football / Volleyball / Human
- **Todos**: โหลดจาก JSONPlaceholder (มีข้อมูลสำรอง), toggle Done/Waiting, ลบ, เพิ่ม (modal), กรอง "Show only waiting", 5/10/50 ต่อหน้า, First/Prev/เลขหน้า/Next/Last
- **Products (123)** และ **Carts**: เพิ่มสินค้า ปรับจำนวน ลบ คำนวณยอดรวม
- **Logout**

## โครงสร้าง
- `src/App.jsx` – login, layout, Home, Calculator, Products, Carts
- `src/pages/Todos.jsx` – หน้า Todos (พอร์ตจากโฟลเดอร์ todos)
- `src/pages/Animation.jsx` – หน้า Animation
- `src/components/Icons.jsx` – ไอคอน SVG
- `src/style.css` – สไตล์ทั้งหมด

ข้อมูลผู้ใช้ (ชื่อ อีเมล รหัสนักศึกษา เบอร์โทร) แก้ได้ที่ค่าคงที่ `ACCOUNT` และ `ME` ใน `src/App.jsx`
