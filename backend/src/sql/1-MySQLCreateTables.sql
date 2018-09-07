-- Indexes for primary keys have been explicitly created.

DROP TABLE Task;
DROP TABLE Project;
DROP TABLE User;

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(60) COLLATE latin1_bin NOT NULL,
    password VARCHAR(60) NOT NULL, 
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL, 
    email VARCHAR(60) NOT NULL,
    role TINYINT NOT NULL,
    CONSTRAINT UserPK PRIMARY KEY (id),
    CONSTRAINT UserNameUniqueKey UNIQUE (userName)
) ENGINE = InnoDB;

CREATE INDEX UserIndexByUserName ON User (userName);

CREATE TABLE Project (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    userId BIGINT NOT NULL,
    CONSTRAINT ProjectPrimaryKey PRIMARY KEY (id),
    CONSTRAINT ProjectNameUniqueKey UNIQUE (userId, name),
    CONSTRAINT ProjectUserIdFK FOREIGN KEY(userId) REFERENCES User (id)
) ENGINE = InnoDB;

CREATE INDEX ProjectIndexByUserIdAndId ON Project (userId, id);

CREATE TABLE Task (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    completed BIT(1) NOT NULL,
    projectId BIGINT NOT NULL,
    CONSTRAINT TaskPrimaryKey PRIMARY KEY (id),
    CONSTRAINT TaskNameUniqueKey UNIQUE (projectId, name),
    CONSTRAINT TaskProjectIdFK FOREIGN KEY(projectId) REFERENCES Project (id)
) ENGINE = InnoDB;

CREATE INDEX TaskIndexByProjectIdAndId ON Task (projectId, id);

