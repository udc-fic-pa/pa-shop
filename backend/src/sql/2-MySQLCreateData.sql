-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "pa" database.
-------------------------------------------------------------------------------

INSERT INTO Category (name) VALUES ('Cine');
INSERT INTO Category (name) VALUES ('Música');

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('2001: A Space Odyssey [Blu-ray]', 
        '2001 is a story of evolution. Sometime in the distant past, someone\
or something nudged evolution by placing a monolith on Earth (presumably\
elsewhere throughout the universe as well)...', 11.99, 1);

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Blade Runner [Blu-ray]', 
        'In the 21st century, a corporation develops human clones to be used\
as slaves in colonies outside the Earth, identified as replicants. In 2019,\
a former police officer is hired to hunt down a fugitive group of clones\
living undercover in Los Angeles...', 11.99, 1);

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Alien [DVD]', 
        'In the distant future, the crew of the commercial spaceship Nostromo\
are on their way home when they pick up a distress call from a distant moon.\
The crew are under obligation to investigate and the spaceship descends on the\
moon afterwards...', 7.60, 1);
    
INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Matrix [Blu-Ray]', 
        'Thomas A. Anderson is a man living two lives. By day he is an average\
computer programmer and by night a hacker known as Neo. Neo has always\
questioned his reality, but the truth is far beyond his imagination...', 11.99, 1);

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Pale rider [DVD]', 
        'Clint Eastwood is a mysterious preacher who comes to a gold mining\
camp near a small town in the mountains. The miners are in grave danger as\
a ruthless landowner decides to take their land, with the support of the\
sheriff...', 7.60, 1);

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Pulp Fiction [DVD]', 
        'Series of less-and-more related but separated short stories of crime\
and comedy that each result into an unexpected ending including unexpected\
deaths, sudden twists, black comedy events and horrific conclusions of crime\
and its following consequences...', 7.60, 1);

INSERT INTO Product(name, description, price, categoryId) 
    VALUES ('Unforgiven [DVD]',
        'Retired Old West gunslinger William Munny reluctantly takes on one\
last job, with the help of his old partner and a young man...', 7.60, 1);