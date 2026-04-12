import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import publication_1 from "../publications/analiza-VIZIJA-final.pdf";
import publication_2 from "../publications/Наративен извештај за работа на Визија.pdf";
import primerPdf from "../publications/primer.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const publications = [
	{ id: 1, file: publication_1 },
	{ id: 2, file: publication_2 },
	{ id: 3, file: primerPdf },
];

export default function PublicationsContainer() {
	const previewWidth = 240;
	const previewHeight = 340;

	return (
		<section className="w-full bg-white px-4 py-16 sm:px-8 md:px-12 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
					{publications.map((publication) => (
						<article key={publication.id} className="flex flex-col items-center">
							<div className="w-65 overflow-hidden rounded-2xl bg-transparent p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
								<div className="flex h-85 w-60 items-center justify-center overflow-hidden [&_.react-pdf__Page]:h-full! [&_.react-pdf__Page]:w-full! [&_.react-pdf__Page__canvas]:h-full! [&_.react-pdf__Page__canvas]:w-full!">
									<Document
										file={publication.file}
										loading={<p className="text-sm text-gray-500">Се вчитува PDF...</p>}
										error={<p className="text-sm text-red-600">Не може да се прикаже PDF.</p>}
										onLoadError={(error) => {
											console.error("PDF load error:", error);
										}}
										onSourceError={(error) => {
											console.error("PDF source error:", error);
										}}
									>
										<Page
											pageNumber={1}
											width={previewWidth}
											height={previewHeight}
											renderAnnotationLayer={false}
											renderTextLayer={false}
										/>
									</Document>
								</div>
							</div>

							<a
								href={publication.file}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex rounded-full bg-purple-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30"
							>
								Прочитај повеќе
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
