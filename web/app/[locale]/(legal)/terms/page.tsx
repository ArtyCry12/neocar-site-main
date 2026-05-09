import LegalDocument, { legalMetadata } from "@/components/legal/LegalDocument";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return legalMetadata(params, "Terms");
}

export default async function TermsPage({ params }: Props) {
  return <LegalDocument params={params} namespace="Terms" />;
}
