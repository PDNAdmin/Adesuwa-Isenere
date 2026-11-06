import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { BookIcon } from "@sanity/icons/Book";
import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { CommentIcon } from "@sanity/icons/Comment";
import { DocumentIcon } from "@sanity/icons/Document";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { TagIcon } from "@sanity/icons/Tag";

function singleton(S: Parameters<StructureResolver>[0], type: string, title: string, icon = DocumentIcon) {
  return S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Website Content")
    .items([
      singleton(S, "siteSettings", "Website Settings & Contact Details", CogIcon),
      S.divider().title("Pages"),
      singleton(S, "homePage", "Home Page", HomeIcon),
      singleton(S, "aboutPage", "About Page"),
      singleton(S, "servicesPage", "Services Page"),
      singleton(S, "mediaPage", "Media & Resources Page"),
      singleton(S, "galleryPage", "Gallery Page", ImagesIcon),
      singleton(S, "contactPage", "Contact Page"),
      S.divider().title("Lists you can add to (drag to reorder)"),
      orderableDocumentListDeskItem({ type: "galleryAlbum", title: "Gallery Photo Albums", icon: ImagesIcon, S, context }),
      orderableDocumentListDeskItem({ type: "service", title: "Counselling Services", icon: CaseIcon, S, context }),
      orderableDocumentListDeskItem({ type: "counsellingPackage", title: "Counselling Packages & Prices", icon: TagIcon, S, context }),
      orderableDocumentListDeskItem({ type: "testimonial", title: "Client Testimonials", icon: CommentIcon, S, context }),
      orderableDocumentListDeskItem({ type: "faq", title: "Frequently Asked Questions", icon: HelpCircleIcon, S, context }),
      orderableDocumentListDeskItem({ type: "product", title: "Books & Courses", icon: BookIcon, S, context }),
    ]);
