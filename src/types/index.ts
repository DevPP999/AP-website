// Global type definitions
export type Locale = "th" | "en";

export interface Navbar {
  home: string;
  products: string;
  projects: string;
  about: string;
  contact: string;
}

export interface Hero {
  title: string;
  highlight: string;
  desc1: string;
  desc2: string;
  btnExplore: string;
  btnProjects: string;
}

export interface WhyAPCertOrPartnership {
  titleImage: string;
  title: string;
  description: string | string[];
}

export interface WhyAPItem {
  icon: string;
  title: string;
  description: string;
}

export interface WhyAP {
  title: string;
  certifications: WhyAPCertOrPartnership[];
  partnerships: WhyAPCertOrPartnership[];
  whyChooseTitle: string;
  whyChooseAp: WhyAPItem[];
}

export interface MainProductItem {
  category: string;
  image: string;
  title: string;
  description?: string;
}

export interface MainProduct {
  title: string;
  products: MainProductItem[];
}

export interface ContactSale {
  heading: string;
  contactButton: string;
  downloadButton: string;
}

export interface About {
  title: string;
  storyTitle: string;
  storyDesc: string;
  visionTitle: string;
  vision: string;
  mission: string;
  partnerTitle: string;
  partnerDesc: string;
  comprehensive: string;
  modern: string;
  reliable: string;
  value: string;
  friendly: string;
  trustTitle: string;
  isoNote: string;
  factoryTitle: string;
  factoryDesc: string;
}

export interface ProductTableHeaders {
  diameter: string;
  length: string;
  weight: string;
}

export interface Product {
  title: string;
  subtitle: string;
  searchLabel: string;
  filterLabel: string;
  productListTitle: string;
  productCatalogTitle: string;
  productNameLabel: string;
  productDescription: string;
  specTitle: string;
  specTableHeaders: ProductTableHeaders;
  specDataPlaceholder: string;
  downloadTitle: string;
  downloadSpecBtn: string;
  requestQuoteBtn: string;
  additionalInfoTitle: string;
  additionalInfoList: string[];
  relatedProductsTitle: string;
  relatedProductNamePrefix: string;
  relatedProductCodePrefix: string;
}

export type ProjectCategory =
  | "PEA"
  | "MEA"
  | "EGAT"
  | "Government"
  | "Industrial"
  | "115kV";

export interface Projects {
  title: string;
  subtitle: string;
  successText: string;
  filterLabel: string;
  categories: {
    value: ProjectCategory;
    label: string;
  }[];
  noProjectsText: string;
  loadMoreBtn: string;
}

export interface ArticleDescription {
  descTitle?: string;
  descTitleDetail?: string;
  descInfoDetail?: string;
}

export interface Article {
  id: number | string;
  title: string;
  category: string;
  description: ArticleDescription[];
  image: string;
  gallery?: string[];
}

export interface JoinUs {
  title: string;
  subtitle: string;
  applicationLink: string;
}

export interface ContactUs {
  title: string;
  subtitle: string;
  formTitle: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitButton: string;
}

export interface Footer {
  copyright: string;
  socialMediaTitle: string;
}

export interface Dictionary {
  navbar: Navbar;
  hero: Hero;
  whyAP: WhyAP;
  mainProduct: MainProduct;
  contactSale: ContactSale;
  about: About;
  product: Product;
  projects: Projects;
  articles: Article;
  joinUs: JoinUs;
  contactUs: ContactUs;
  footer: Footer;
}

export interface ProjectItem {
  id: number | string;
  title: string;
  description: string | string[];
  category: ProjectCategory;
  image?: string;
  year?: string;
  gallery?: string[];
}
