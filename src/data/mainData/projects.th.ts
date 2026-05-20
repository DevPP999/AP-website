// projects.th.ts
// โปรดปรับแก้ path ตรงนี้ให้ถูกต้องตามโครงสร้างไฟล์ของคุณ
import type { ProjectItem } from "@/types";

const projects: ProjectItem[] = [
  {
    id: "115-kV-Transmission-Line-Connection-at-Alpha-One-Project",
    title:
      "โครงการงานก่อสร้างการเชื่อมโยงสายส่งระบบ 115 เควี สถานีไฟฟ้าบริษัท อัลฟ่า วัน โปรเจค จำกัด (SPP) - สถานีไฟฟ้าแรงสูงหลังสวน (กฟผ.) จ.ชุมพร",
    description:
      "ดำเนินการผลิตและส่งมอบอุปกรณ์หัวเสา ชุดประกอบระบบ (OHGW) ชุดประกอบงานกราวด์ และอุปกรณ์ฮาร์ดแวร์ทางไฟฟ้าครบชุด เพื่อใช้ในงานระบบจำหน่ายและส่งจ่ายไฟฟ้าแรงต่ำ–แรงสูง โดยมีการควบคุมคุณภาพทุกขั้นตอนและจัดส่งถึงหน้างานอย่างปลอดภัย ตรงเวลา",
    category: "115kV",
    year: "2023",
    image: "/images/project/Chumphon/5.webp",
    gallery: [
      "/images/project/Chumphon/1.webp",
      "/images/project/Chumphon/2.webp",
      "/images/project/Chumphon/3.webp",
      "/images/project/Chumphon/4.webp",
      "/images/project/Chumphon/0.webp",
      "/images/project/Chumphon/6.webp",
    ],
  },
  {
    id: "115-kV-Transmission-Line-Connection-at-Prajuabkirikhan-Project",
    title:
      "โครงการก่อสร้างระบบส่งไฟฟ้าแรงสูง 115 เควี ของบริษัท อัลฟา ทู โปรเจค จำกัด (SPP) ในงาน Terminal Substation – Cut & Turn เชื่อมโยงระหว่างสถานีไฟฟ้าบางสะพาน 1 และสถานีไฟฟ้าบางสะพาน 2 จังหวัดประจวบคีรีขันธ์",
    description: [
      "บริษัท เอี่ยมพงศ์พัฒนา จำกัด มีความภาคภูมิใจที่ได้เป็นส่วนหนึ่งในการสนับสนุนโครงการก่อสร้างระบบส่งไฟฟ้าแรงสูง 115 เควี ของบริษัท อัลฟา ทู โปรเจค จำกัด (SPP) ในงาน Terminal Substation – Cut & Turn เชื่อมโยงระหว่างสถานีไฟฟ้าบางสะพาน 1 และสถานีไฟฟ้าบางสะพาน 2 จังหวัดประจวบคีรีขันธ์","โดย บริษัท อินเตอร์ลิ้งค์ เพาเวอร์ แอนด์ เอ็นจิเนียริ่ง จำกัด ได้ให้ความไว้วางใจเลือกใช้อุปกรณ์จากยี่ห้อ AP ของเรา เพื่อนำไปใช้ในงานติดตั้งและพัฒนาระบบไฟฟ้าแรงสูงของโครงการดังกล่าว","เรามุ่งมั่นส่งมอบสินค้าที่ได้มาตรฐาน คุณภาพเชื่อถือได้ พร้อมตอบโจทย์งานวิศวกรรมโครงสร้างพื้นฐานด้านพลังงาน เพื่อร่วมผลักดันให้โครงการแล้วเสร็จอย่างมีประสิทธิภาพ ปลอดภัย และเสริมสร้างความมั่นคงด้านพลังงานให้กับประเทศต่อไป"
    ],
    category: "115kV",
    year: "2026",
    image: "/images/project/Prajuabkirikhan/0.webp",
    gallery: [
      "/images/project/Prajuabkirikhan/1.webp",
      "/images/project/Prajuabkirikhan/2.webp",
      "/images/project/Prajuabkirikhan/3.webp",
      "/images/project/Prajuabkirikhan/4.webp",
      "/images/project/Prajuabkirikhan/5.webp",
      "/images/project/Prajuabkirikhan/6.webp",
    ],
  }
];

export default projects;
