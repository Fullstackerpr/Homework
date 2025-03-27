-- create database --

CREATE DATABASE football;

\c football;


-- create tournaments table--

CREATE TABLE tournaments (
    tournament_id serial primary key,
    tournament_name varchar (50),
    start_date date,
    end_date date,
    status varchar(20)
);


-- insert into tounaments --


INSERT INTO tournaments (tournament_name, start_date, end_date, status) 
VALUES 
    ('Champions League', '2024-09-01', '2025-05-30', 'Ongoing'),
    ('Europa League', '2024-09-15', '2025-05-20', 'Upcoming'),
    ('World Cup', '2026-06-08', '2026-07-08', 'Scheduled'),
    ('Copa America', '2024-06-10', '2024-07-15', 'Completed'),
    ('Asian Cup', '2024-01-10', '2024-02-20', 'Completed');

select * from tournaments;

-- create tournament_group table--

CREATE TABLE tournament_group (
    group_id serial primary key,
    group_name varchar(20),
    tournament_id int not null,
    created_at timestamp,
    foreign key (tournament_id) references tournaments (tournament_id)
);


-- insert into tournament_group --


INSERT INTO tournament_group (group_name, tournament_id, created_at) 
VALUES 
    ('Group A', 1, '2024-09-01 10:00:00'),
    ('Group B', 1, '2024-09-01 10:05:00'),
    ('Group C', 2, '2024-09-15 11:00:00'),
    ('Group D', 2, '2024-09-15 11:10:00'),
    ('Group E', 3, '2026-06-08 12:00:00'),
    ('Group F', 3, '2026-06-08 12:15:00');

 select * from tournament_group;

-- create football_clubs table--

CREATE TABLE football_clubs (
    club_id serial primary key,
    club_name varchar(30),
    city varchar(30),
    country varchar(30),
    founder_year int
);


-- insert into football_clubs --


INSERT INTO football_clubs (club_name, city, country, founder_year) 
VALUES 
    ('Barcelona', 'Barcelona', 'Spain', 1899),
    ('Real Madrid', 'Madrid', 'Spain', 1902),
    ('Manchester United', 'Manchester', 'England', 1878),
    ('Bayern Munich', 'Munich', 'Germany', 1900),
    ('Juventus', 'Turin', 'Italy', 1897),
    ('Paris Saint-Germain', 'Paris', 'France', 1970);

select * from football_clubs;

-- create teams table --

CREATE TABLE teams (
    team_id serial primary key,
    team_name varchar(25),
    club_id int not null,
    group_id int not null,
    coach_name varchar(30),
    foreign key (club_id) references football_clubs (club_id),
    foreign key (group_id) references tournament_group (group_id)
);


-- insert into teams --


INSERT INTO teams (team_name, club_id, group_id, coach_name) 
VALUES 
    ('Barcelona', 2, 1, 'Messi'),
    ('Real Madrid', 1, 1, 'Ronaldo'),
    ('Manchester United', 3, 2, 'Erik ten Hag'),
    ('Bayern Munich', 4, 2, 'Thomas Tuchel'),
    ('Juventus', 5, 3, 'Massimiliano Allegri'),
    ('PSG', 6, 3, 'Luis Enrique');

select * from teams;

-- create players table --

CREATE TABLE players (
    player_id serial primary key,
    full_name varchar(30),
    date_of_birth date,
    position varchar(25),
    team_id int not null,
    jersey_number int not null,
    foreign key(team_id) references teams (team_id)
);


-- insert into players --


INSERT INTO players (full_name, date_of_birth, position, team_id, jersey_number) 
VALUES 
    ('Lionel Messi', '1987-06-24', 'Forward', 2, 10),
    ('Cristiano Ronaldo', '1985-02-05', 'Forward', 3, 7),
    ('Karim Benzema', '1987-12-19', 'Striker', 1, 9),
    ('Kevin De Bruyne', '1991-06-28', 'Midfielder', 3, 17),
    ('Sergio Ramos', '1986-03-30', 'Defender', 1, 4),
    ('Neymar Jr', '1992-02-05', 'Forward', 6, 10);

select * from players;

-- create match_fixtures table --

CREATE TABLE match_fixtures (
    match_id serial primary key,
    match_date timestamp,
    venue varchar(30),
    home_team_id int not null,
    away_team_id int not null,
    home_score int,
    away_score int,
    tournament_id int not null,
    match_status varchar(30),
    foreign key (tournament_id) references tournaments (tournament_id),
    foreign key (home_team_id) references teams (team_id),
    foreign key (away_team_id) references teams (team_id)
);


-- insert into match_fixtures --

INSERT INTO match_fixtures (match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status)
VALUES 
    ('2024-06-01 18:00:00', 'Camp Nou', 1, 2, 2, 1, 1, 'Finished'),
    ('2024-06-02 20:00:00', 'Old Trafford', 3, 4, 1, 1, 1, 'Ongoing');


select * from match_fixtures;