import LegalDocument, { legalMetadata } from "@/components/legal/LegalDocument";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  return legalMetadata(params, "Privacy");
}

export default async function PrivacyPage({ params }: Props) {
  return <LegalDocument params={params} namespace="Privacy" />;
}
