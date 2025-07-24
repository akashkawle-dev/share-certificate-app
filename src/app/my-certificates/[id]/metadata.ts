
import { Metadata } from "next";



interface CertificateMetadataProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: CertificateMetadataProps): Promise<Metadata> {

  const fallbackTitle = "certificate_not_found";
  const fallbackDescription = "the_requested_certificate_could_not_be_found";

  const id = params.id;

  try {
    const response = await fetch(
      `https://devapiv1.immverse.ai/api/v1/user-routes/predefined-courses/validate-certificate/${id}`,
      {
        next: { revalidate: 3600 }, // revalidate every hour
      }
    );
    const result = await response.json();
    console.log("Certificate data fetch : ", result)
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://edu.immverse.ai";

    if (!result?.validateCertificate?.course) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
      };
    }

    const course = result.validateCertificate.course;

    const certificateUrl = result.validateCertificate.certificateUrl;
    const formats = ["jpg", "png", "webp"];

    const images = formats.map((format) => ({
      url: certificateUrl || "",
      width: 1200,
      height: 630,
      type: `image/${format === "jpg" ? "jpeg" : format}`,
    }));

    return {
      title: course.courseTitle,
      description: course.courseDescription,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `${baseUrl}/my-certificates/${id}`,
      },
      openGraph: {
        title: course.courseTitle,
        description: course.courseDescription,
        url: `${baseUrl}/my-certificates/${id}`,
        type: "article",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: course.courseTitle,
        description: course.courseDescription,
        images: certificateUrl
          ? [{ url: certificateUrl }]
          : [{ url: `${baseUrl}/assets/default-certificate.jpg` }],
      },
    };
  } catch (err) {
    console.error("Metadata fetch failed", err);
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }
}
