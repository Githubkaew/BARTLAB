// เพิ่มการโต้ตอบเมื่อคลิกการ์ดประกาศ
document.querySelectorAll('.announcement-card').forEach(card => {
    card.addEventListener('click', () => {
        alert('กำลังเตรียมลิงก์ไปหน้าอ่านประกาศเต็ม...');
    });
});