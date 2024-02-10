// import fetch, { Response } from 'node-fetch';
import sequelize from './db.config';
import Book from '../entities/bookEntity';


export default async function fetchAllBooks(searchTerm: string, apiKey: string): Promise<void> {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    let page = 0;
    let totalItems = 28;

    for (let i = 0; i < totalItems; i += 10) {
        const response = await fetch(`${baseUrl}?q=${searchTerm}&maxResults=10&startIndex=${i}&key=${apiKey}`);
        const data:any = await response.json();
        totalItems = data.totalItems;
        for (const item of data.items) {
            const book = item.volumeInfo;
            if (!book.title || !book.authors || !book.categories || !book.imageLinks || !book.imageLinks.thumbnail) {
                continue;
            }
            
            const newBook = await Book.create({
                title: book.title,
                coverImageUrl: book.imageLinks?.thumbnail,
                writer: book.authors?.join(', ') ,
                point: 100,
                tag: book.categories?.join(', '),
            });
            console.log(`Created book with id ${newBook.id}`);
        }
        console.log(`Fetched ${i + 10} books`);
        if (i + 10 == 460){
            break;
        }
    }
}

