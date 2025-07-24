import Image from "next/image";
import React from "react";

interface CertificatePageProps {
  params: {
    id: string;
  };
}

interface CertificateData {
  title?: string;
  description?: string;
  certificateUrl?: string;
  courseThumbnail?: string;
  urlPath?: string;
  formats?: string[];
  certificateNotFound?: boolean;
}

async function fetchCertificateData(id: string): Promise<CertificateData> {
  const fallbackTitle = "Certificate Not Found";
  const fallbackDescription = "the_requested_certificate_could_not_be_found";

  if (!id || !/^[0-9a-fA-F\-]{36}$/.test(id)) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      certificateNotFound: true,
    };
  }

  try {
    const response = await fetch(
      `https://devapiv1.immverse.ai/api/v1/user-routes/predefined-courses/validate-certificate/${id}`,
      {
        next: { revalidate: 3600 }, // revalidate every hour
      }
    );
    const result = await response.json();

    if (!result?.validateCertificate?.course) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        certificateNotFound: true,
      };
    }

    const { course, certificateUrl } = result.validateCertificate;

    return {
      title: course.courseTitle,
      description: course.courseDescription,
      certificateUrl,
      courseThumbnail: course.courseThumbnail,
      urlPath: `/my-certificates/${id}`,
      formats: ["jpg", "png", "webp"],
      certificateNotFound: false,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      certificateNotFound: true,
    };
  }
}

export async function generateStaticParams() {
  return []; // This code black is here to tell nextjs : "I don’t know any certificate IDs at build time don’t pre-render anything."
}

// If you don’t know all IDs at build time, you can allow on-demand generation by setting:
export const dynamicParams = true; // fallback behavior
export const revalidate = false;

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { id } = params;
  const data = await fetchCertificateData(id);

  if (data.certificateNotFound) {
    return (
      <main className="main-layout -dark-bg-dark-1">
        <section
          className="container d-flex flex-column gap-3 justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <h1 className="text-dark-8 text-center">{data.title}</h1>
          <p className="text-gray fs-3 text-center">{data.description}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="main-layout -dark-bg-dark-1">
      <section className="container">
        <nav className="d-flex border -dark-bg-dark-2 shadow-lg card rounded-3 shadow-md p-2 gap-2 flex-column flex-sm-row justify-content-start align-items-center">
          <div className="rounded-3">
            <Image
              className="rounded-3"
              src={data.courseThumbnail || "/assets/default-thumbnail.jpg"}
              width={280}
              height={280}
              alt={`Thumbnail for ${data.title}`}
              priority
            />
          </div>
          <div className="d-flex flex-column justify-content-between align-items-start gap-2 p-2">
            <h4 className="text-dark-8">{data.title}</h4>
            <p className="text-gray">{data.description}</p>
          </div>
        </nav>

        <main className="w-100 border card -dark-bg-dark-1 p-2 h-auto my-2">
          <Image
            src={data.certificateUrl || "/assets/default-certificate.jpg"}
            width={1000}
            height={700}
            alt={`Certificate image for ${data.title}`}
            className="card w-100 mx-auto"
            priority
          />
        </main>
      </section>
    </main>
  );
}
