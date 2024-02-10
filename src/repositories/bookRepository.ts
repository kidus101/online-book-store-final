import Book from "../entities/bookEntity";


class BookRepository {
    async getBookById(id: number): Promise<Book | null> {
        return Book.findByPk(id);
    }

    async createBook(book: Partial<Book>): Promise<Book> {
        return Book.create(book);
    }

    async getBookByTitle(title: string): Promise<Book | null> {
        return Book.findOne({
            where: {
                title: title
            }
        });
    }

    async deleteBook(id: number): Promise<number> {
        return Book.destroy({
            where: {
                id: id
            }
        });
    }

    async getAllBooks(page: number, pageSize: number): Promise<Book[]> {
        const offset = (page - 1) * pageSize;
        return Book.findAll({ offset: offset, limit: pageSize });
    }
}

export default new BookRepository();