// projects.th.ts
// โปรดปรับแก้ path ตรงนี้ให้ถูกต้องตามโครงสร้างไฟล์ของคุณ
import type { ProjectItem } from "@/types";

const projects: ProjectItem[] = [
  {
    id: "115-kV-Transmission-Line-Connection-at-Alpha-One-Project",
    title:
      "Construction Project for the 115 kV Transmission Line Connection at Alpha One Project Co., Ltd. Power Plant (SPP) - Lang Suan High Voltage Substation (EGAT) Province Chumphon",
    description:
      "Electrical hardware for use in low-voltage to high-voltage power distribution and transmission systems, with quality control at every stage and safe, on-time delivery to the job site.",
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
    "Project for the Construction of a 115 kV High Voltage Transmission System by Alpha Two Project Co., Ltd. (SPP), for Terminal Substation – Cut & Turn, connecting Bang Saphan 1 Substation and Bang Saphan 2 Substation, Prachuap Khiri Khan Province.",
    description: [
      "Iampong Development Co., Ltd. is proud to be part of supporting the construction of a 115 kV high-voltage transmission system project by Alpha Two Project Co., Ltd. (SPP). The project involves Terminal Substation – Cut & Turn works, connecting Bang Saphan 1 Substation and Bang Saphan 2 Substation in Prachuap Khiri Khan Province.","Interlink Power and Engineering Co., Ltd. has entrusted us by selecting our AP brand products for use in the installation and development of the high-voltage electrical system for this project.","We are committed to delivering standardized, high-quality, and reliable products that meet the demands of energy infrastructure engineering. Our goal is to contribute to the successful, efficient, and safe completion of the project, while strengthening the country’s energy security."
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
