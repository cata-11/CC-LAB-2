const http = require('http');
const url = require('url');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'cc-lab-01'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected...');
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const id = parsedUrl.query.id;
  const query = parsedUrl.query;

  switch (req.method) {
    case 'GET':
      if (pathname === '/books' && id) {
        getBookById(req, res, id);
      } else if (pathname === `/books`) {
        getAllBooks(req, res, query);
      } else {
        notFound(res);
      }
      break;
    case 'POST':
      if (pathname === `/books` && id) {
        createBookWithId(req, res, id);
      } else if (pathname === `/books`) {
        createBook(req, res);
      } else {
        notFound(res);
      }
      break;
    case 'PUT':
      if (pathname === `/books` && id) {
        updateBookById(req, res, id);
      } else if (pathname === '/books') {
        notAllowed(res);
      } else {
        notFound(res);
      }
      break;
    case 'DELETE':
      if (pathname === `/books` && id) {
        deleteBookById(req, res, id);
      } else if (pathname === '/books') {
        notAllowed(res);
      } else {
        notFound(res);
      }
      break;
    default:
      notFound(res);
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const notAllowed = (res) => {
  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Method Not Allowed' }));
};

const notFound = (res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
};

const createBook = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const book = JSON.parse(data);
    connection.query(
      'INSERT INTO Books SET ?',
      book,
      function (error, results, fields) {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Book already exists' }));
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
          return;
        }

        const newBookUrl = `/books/${results.insertId}`;
        res.writeHead(201, { Location: newBookUrl });
        res.end();
      }
    );
  });
};

const createBookWithId = (req, res, id) => {

  connection.query(
    'SELECT * FROM Books WHERE Id = ?',
    id,
    function (error, results, fields) {
      console.log(results)
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
        return;
      }
      if (results.length > 0) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Book already exists' }));
        return;
      }

      let body = '';

      req.on('data', function (chunk) {
        body += chunk.toString();
      });

      req.on('end', function () {
        const book = JSON.parse(body);
        console.log(book)
        const newBook = {
          id: id,
          title: book.title,
          author: book.author,
          pages: book.pages,
          description: book.description
        };

        connection.query(
          'INSERT INTO Books SET ?',
          newBook,
          function (error, results, fields) {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal server error' }));
              return;
            }

            res.writeHead(201, {
              'Content-Type': 'application/json',
              Location: '/books/' + id
            });
            res.end(JSON.stringify({data: newBook}));
          }
        );
      });
    }
  );
};

const getAllBooks = (req, res, query) => {
  let sql = 'SELECT * FROM Books';
  const queryParams = [];

  const limit = 3;
  const page = parseInt(query.page);
  const offset = (page - 1) * limit;
  if (page) sql += ` LIMIT ? OFFSET ?`;
  queryParams.push(limit, offset);

  connection.query(sql, queryParams, (error, results, fields) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: results }));
  });
};

const getBookById = (req, res, id) => {
  connection.query(
    'SELECT * FROM Books WHERE id = ?',
    id,
    function (error, results, fields) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
        return;
      }

      if (results.length === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Book not found' }));
        return;
      }

      const book = results[0];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ data: book }));
    }
  );
};

const updateBookById = (req, res, id) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    const book = JSON.parse(data);
    connection.query(
      'UPDATE Books SET Title = ?, Author = ?, Pages = ?, Description = ? WHERE id = ?',
      [book.Title, book.Author, book.Pages, book.Description, id],
      (error, results, fields) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal server error' }));
          return;
        }

        if (results.affectedRows === 0) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Book not found' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end();
      }
    );
  });
};

const deleteBookById = (req, res, id) => {
  connection.query(
    'DELETE FROM Books WHERE Id = ?',
    id,
    function (error, results, fields) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
        return;
      }

      if (results.affectedRows === 0) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Book not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end();
    }
  );
};
