# PA Shop

## Installing the development environment and building the examples

- [Instructions for Unix-like operating systems (spanish)] (/LEEME_UNIX.md).
- [Instructions for Windows (spanish)] (/LEEME_WINDOWS.md).

## Requirements

- Node 8+.
- Java SE 8+.
- Maven 3+.
- MySQL 8+.

## Database creation

```
Start Mysql server if not running (e.g. mysqld).

mysqladmin -u root create pa
mysqladmin -u root create patest

mysql -u root
    CREATE USER 'pa'@'localhost' IDENTIFIED BY 'pa';
    GRANT ALL PRIVILEGES ON pa.* to 'pa'@'localhost' WITH GRANT OPTION;
    GRANT ALL PRIVILEGES ON patest.* to 'pa'@'localhost' WITH GRANT OPTION;
    exit
```

## Run

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
npm install (only first time to download libraries)
npm start
```
