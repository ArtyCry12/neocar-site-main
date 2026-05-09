import LegalDocument, { legalMetadata } from "@/components/legal/LegalDocument";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return legalMetadata(params, "Cookies");
}

export default async function CookiesPage({ params }: Props) {
  return <LegalDocument params={params} namespace="Cookies" />;
}
