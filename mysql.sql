use Tentabank;
drop table if exists pending;
drop table if exists accepted;
drop table if exists denied;
drop table if exists comments;
drop table if exists usertable;
drop table if exists rating;

create table usertable(
user_id int NOT NULL auto_increment,
username varchar(50) not null,
email varchar(50) not null,
password varchar(250) not null,
role varchar(50) default "Student",
uploads int default 0,
university varchar(100) not null,
primary key (user_id));

Create Table pending(
id Int AUTO_INCREMENT Not Null Primary Key, 
file_name Varchar(255), 
cource_code varchar(10) not null,
grade varchar(1) not null,
exam_date date not null,
file_data varchar(300) Not Null, 
user_id int Not Null, 
created_on Date Not Null,
rating int default 0,
FOREIGN KEY (user_id) REFERENCES usertable(user_id),
accepted Varchar(255) default "pending",
exam_id varchar(255) Not Null,
university varchar(100) not null
);

Create Table accepted(
id Int AUTO_INCREMENT Not Null Primary Key, 
file_name Varchar(255), 
cource_code varchar(10) not null,
grade varchar(1) not null,
exam_date date not null,
file_data varchar(300) Not Null, 
user_id int Not Null, 
created_on Date Not Null,
rating int default 0,
FOREIGN KEY (user_id) REFERENCES usertable(user_id),
accepted Varchar(255) default "acccepted",
exam_id varchar(255) Not Null,
university varchar(100) not null
);

Create Table denied(
id Int AUTO_INCREMENT Not Null Primary Key, 
file_name Varchar(255), 
cource_code varchar(10) not null,
grade varchar(1) not null,
exam_date date not null,
file_data varchar(300) Not Null, 
user_id int Not Null, 
created_on Date Not Null,
rating int default 0,
FOREIGN KEY (user_id) REFERENCES usertable(user_id),
accepted Varchar(255) default "denied",
exam_id varchar(255) Not Null,
university varchar(100) not null
);

CREATE TABLE comments (
    comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    file_id INT,
    user_id INT,
    comment VARCHAR(255),
    created_on DATETIME,
    parent_comment_id INT,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

create table rating(
user_id int,
exam_id int,
rating int,
PRIMARY KEY (user_id, exam_id)
);

drop procedure if exists update_rating;    
DELIMITER //
CREATE PROCEDURE update_rating (user_id1 int, exam_id1 int, rating1 int)
DETERMINISTIC
BEGIN
	IF EXISTS (SELECT user_id, exam_id1 FROM rating where user_id = user_id1 AND exam_id = exam_id1)
    THEN
    UPDATE rating SET rating = rating1 WHERE user_id = user_id1 AND exam_id = exam_id1;
    ELSE
    INSERT INTO rating VALUES (user_id1, exam_id1, rating1);
    END IF;
END//
DELIMITER ;

drop trigger if exists accepted_review;
DELIMITER //
CREATE TRIGGER accepted_review 
AFTER UPDATE ON pending
FOR EACH ROW
BEGIN
	IF NEW.accepted="accepted" THEN
		INSERT INTO accepted (id, file_name, cource_code, grade, exam_date, file_data, user_id, created_on, rating, accepted, exam_id)
		SELECT id, file_name, cource_code, grade, exam_date, file_data, user_id, created_on, rating, accepted, exam_id 
		FROM pending
		WHERE pending.accepted = NEW.accepted;
	ELSEIF NEW.accepted="denied" THEN
		INSERT INTO denied (id, file_name, cource_code, grade, exam_date, file_data, user_id, created_on, rating, accepted, exam_id)
		SELECT id, file_name, cource_code, grade, exam_date, file_data, user_id, created_on, rating, accepted, exam_id
		FROM pending
		WHERE pending.accepted = NEW.accepted;
	END IF;
END//
DELIMITER ;

drop trigger if exists increase_uploads;
DELIMITER //
CREATE TRIGGER increase_uploads
AFTER INSERT ON accepted
FOR EACH ROW
BEGIN
UPDATE usertable
SET usertable.uploads = usertable.uploads + 1
WHERE usertable.user_id = NEW.user_id;
END//
DELIMITER ; 

drop trigger if exists decrease_uploads;
DELIMITER //
CREATE TRIGGER decrease_uploads
AFTER DELETE ON accepted
FOR EACH ROW
BEGIN
UPDATE usertable
SET usertable.uploads = usertable.uploads - 1
WHERE usertable.user_id = OLD.user_id;
END//
DELIMITER ;

drop trigger IF EXISTS insert_update_rating;
DELIMITER //
CREATE TRIGGER insert_update_rating
AFTER INSERT ON rating
FOR EACH ROW
BEGIN
UPDATE accepted
SET rating = (SELECT AVG(rating) FROM rating WHERE exam_id = NEW.exam_id)
WHERE id = NEW.exam_id;
END //
DELIMITER ;

drop trigger IF EXISTS update_rating;
DELIMITER //
CREATE TRIGGER update_rating
AFTER UPDATE ON rating
FOR EACH ROW
BEGIN
UPDATE accepted
SET rating = (SELECT AVG(rating) FROM rating WHERE exam_id = NEW.exam_id)
WHERE id = NEW.exam_id;
END //
DELIMITER ;

drop view if exists course_code_view;    
CREATE VIEW course_code_view AS
SELECT DISTINCT
    CASE SUBSTRING(cource_code, 1, 2)
        WHEN 'MA' THEN 'Matematik kurser'
        WHEN 'IY' THEN 'Ekonomi Kurser'
        WHEN 'PA' THEN 'Programerings Kurser'
        ELSE SUBSTRING(cource_code, 1, 2)
    END AS code_group_name,
    cource_code
FROM
    accepted;

SELECT * FROM pending;
SELECT * FROM accepted;
SELECT * FROM denied;
SELECT * FROM usertable;
select * from comments;
select * from rating;
delete from accepted where id = 1;
/*After you have created a user on the website run this to make it an Admin*/
update usertable set role = "Admin" where user_id = 1