CREATE TABLE USERS (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(255),
    EMAIL VARCHAR(255),
    PASSWORD VARCHAR(80),
    JOINED_UP TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);