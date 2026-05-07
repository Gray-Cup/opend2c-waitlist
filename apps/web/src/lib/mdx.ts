import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface NewsroomPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readingTime: number;
  content: string;
}

interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  client: string;
  industry: string;
  date: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  results: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  content: string;
}

export async function getNewsroomPosts(): Promise<NewsroomPost[]> {
  try {
    const newsroomDir = path.join(process.cwd(), "content/newsroom");

    if (!fs.existsSync(newsroomDir)) {
      console.log("Newsroom posts directory not found, returning empty array");
      return [];
    }

    const files = fs.readdirSync(newsroomDir);
    const posts = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(newsroomDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug,
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          author: data.author || "",
          tags: data.tags || [],
          published: data.published !== false,
          featured: data.featured || false,
          readingTime: data.readingTime || "5 min read",
          content: content || "",
        };
      })
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error reading newsroom posts:", error);
    return [];
  }
}

export function getNewsroomPost(slug: string): NewsroomPost | null {
  const newsroomDir = path.join(process.cwd(), "content/newsroom");
  const filePath = path.join(newsroomDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      content,
      ...data,
    } as NewsroomPost;
  } catch (error) {
    console.error(`Error loading newsroom post ${slug}:`, error);
    return null;
  }
}

export function getCaseStudies(): CaseStudy[] {
  const caseStudiesDir = path.join(process.cwd(), "content/case-studies");

  if (!fs.existsSync(caseStudiesDir)) {
    console.log("Case studies directory not found, returning empty array");
    return [];
  }

  const files = fs.readdirSync(caseStudiesDir);
  const caseStudies = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(caseStudiesDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        content,
        ...data,
      } as CaseStudy;
    });

  return caseStudies
    .filter((cs) => cs.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const caseStudiesDir = path.join(process.cwd(), "content/case-studies");
  const filePath = path.join(caseStudiesDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      content,
      ...data,
    } as CaseStudy;
  } catch (error) {
    console.error(`Error loading case study ${slug}:`, error);
    return null;
  }
}

export function getAllSlugs(type: "newsroom" | "case-studies"): string[] {
  const directory =
    type === "newsroom"
      ? path.join(process.cwd(), "content/newsroom")
      : path.join(process.cwd(), "content/case-studies");

  try {
    const fileNames = fs.readdirSync(directory);
    return fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch (error) {
    return [];
  }
}
