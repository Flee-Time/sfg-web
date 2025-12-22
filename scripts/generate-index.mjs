import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');
const outputFile = path.join(process.cwd(), 'public/search.json');

function generateIndex() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      tags: data.tags || [],
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify(posts));
  console.log('Search index generated.');
}

generateIndex();