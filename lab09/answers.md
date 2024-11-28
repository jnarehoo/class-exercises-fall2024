## SQL Questions
1. SELECT - Retrieving Data. Write a query to list the titles and release years of all movies in the film table.

SELECT
   title, release_year
FROM
   film;


2. WHERE - Filtering Data. Write a query to find all customers whose last name starts with the letter 'S'.

SELECT
  last_name
FROM
  customer
WHERE
  last_name LIKE 'S%';


3. ORDER BY - Sorting Results. List all films titles and their durations, sorted by their rental duration in descending order. If two films have the same rental duration, sort them alphabetically by title.

SELECT 
  title, rental_duration
FROM 
  film
ORDER BY 
  rental_duration DESC, title ASC;


4. JOIN - Combining Tables. Write a query to list all films along with their categories. Show the film title and category name.

SELECT
    film.title, category.name
FROM 
    film
INNER JOIN film_category
    on film.film_id = film_category.film_id
INNER JOIN category
    on film_category.category_id = category.category_id;


5. AGGREGATE FUNCTIONS - Summarizing Data. Write a query to find the average rental duration for movies in each category.

SELECT 
    c.name AS category_name, 
    AVG(f.rental_duration) AS avg_rental_duration 
FROM 
    category c
JOIN 
    film_category fc 
    ON c.category_id = fc.category_id
JOIN 
    film f 
    ON fc.film_id = f.film_id
GROUP BY 
    c.name
ORDER BY 
    avg_rental_duration DESC; -- desc makes this more useful rather than a list of unorganized averages


6. COUNT - Counting Rows. Write a query to count how many films are in the Action category.

SELECT 
    COUNT(*) AS action_film_count -- renames it so its clear we are looking for action
FROM 
    category c 
JOIN 
    film_category fc -- joins it so we can count the movies and not just look at the category options
    ON c.category_id = fc.category_id -- connects them based on id
WHERE 
    c.name = 'Action'; -- specifies we want the Action genre




7. INSERT - Adding Data. Insert a new customer into the customer table. The new customer should have a first name, last name, email, and be linked to an existing store.

INSERT INTO 
  customer (address_id, first_name, last_name, email, store_id) -- it was mad that there wasn't an address_id so I added to to get rid of the error
VALUES 
  (101, 'President', 'Eden', 'Eden.4.prez@fo3.com', 3);


8. UPDATE - Modifying Data. Update the rental rate of all films in the Comedy category, increasing it by 10%.

UPDATE 
  film -- because the rental rate is in that table
SET 
  rental_rate = rental_rate * 1.10 -- increasing 10%
FROM 
  film_category fc -- so we can get genres
JOIN 
  category c 
  ON fc.category_id = c.category_id -- matching up the films to categories
WHERE 
  film.film_id = fc.film_id -- matching the films to their genres/categories
  AND c.name = 'Comedy'; -- making sure to only modify the Comedy films



9. DELETE - Removing Data. Write a query to delete all films that have never been rented. Make sure to use a subquery to identify the films that haven't been rented.

DELETE FROM 
  film
WHERE 
  film_id IN (
    SELECT 
      f.film_id -- selecting the ids
    FROM 
      film f
    LEFT JOIN -- supposed to allow me to join things even if one table may not have corresponding values?
      rental r 
      ON f.film_id = r.film_id -- joining the films to the rental table
    WHERE 
      r.rental_id IS NULL -- removing films that havent been given a rental_id (ie havent been rented)
);

10. CREATE TABLE & ALTER TABLE - Managing Database Structure. Create a new table called movie_reviews with columns for review_id, film_id, reviewer_name, rating, and comments. Then, add a foreign key constraint linking film_id to the film table.

I was having weird issues with my dvdrental database not responding so I hope the below works. When I ran the code I got no errors, but when I checked to see if there was a table nothing happened. I also asked multiple AI's to check it and tried what they gave me and it didn't work either. 

CREATE TABLE movie_reviews (  
   review_id SERIAL PRIMARY KEY,   -- serial makes sure it is incremented
   film_id INTEGER NOT NULL,  -- there has to be a film_id ie. you have to link your review to a film
   reviewer_name VARCHAR(255) NOT NULL,   -- there has to be a reviewer name
   rating INTEGER CHECK (rating BETWEEN 1 AND 5),  -- you can only rate between a 1 and 5 stars
   comments TEXT  
);  

ALTER TABLE movie_reviews  
ADD CONSTRAINT fk_film_id FOREIGN KEY (film_id) REFERENCES film (film_id);

## SQLAlchemy Questions

1. Understanding SQLAlchemy Automap: How do you think the `AutoModels` class works to dynamically generate SQLAlchemy ORM models from the database schema?
It looks like its using automap_base(), auto_models(), and prepare() to get our database into a format that's easily accessable or more understandable. It looks like auto_models.get() allows us to generate classes based on the tables so its easier to interact with the data. 


2. Async Database Operations: Explain the use of asynchronous database sessions in this script. Why does the script use AsyncSession instead of a regular Session, and how does this improve the efficiency of database operations?
Using an AsyncSession allows multiple things to run at the same time rather than waiting for each task to finish. This means that each task is making progress and you don't need to wait in line for you task to run. (I don't fully understand how it works, this is just what I gathered from some google searches and forums discussing Async operations.)


3. SQLAlchemy Query Construction: In the `model_examples` function, there is a query that selects all customers whose last names start with the letter "P". See if you can write another questy that selects customers whose first name ends with the letters "n" or "a" using SQLAlchemy syntax.

async with AsyncSession(engine) as session:
    customers = await session.execute(
        select(Customer).where(
            or_( # doing an or statement 
                Customer.first_name.like("%n"), # using like in the same way as above questions
                Customer.first_name.like("%a")
            )
        )
    )
    for customer in customers.scalars().all():
        print(
              f"{customer.first_name} {customer.last_name}"
            ) # print out the full name of all customers whose first names end with n or a


4. In the `raw_sql_examples` function, there are two ways to execute SQL queries: directly via the engine using conn.execute() and using an ORM session with session.execute(). Discuss the pros and cons of executing raw SQL directly compared to using SQLAlchemy’s ORM methods.
Hint: Consider the trade-offs in terms of readability, safety (e.g., SQL injection risks), and flexibility when using raw SQL versus ORM abstractions.
Direct executions can be more specific and skip unnecessary things that may happen with session.execute(). It also may enable people to do a more complex list of queries and see more easily what is happening. It also may create more instances for mistakes and errors to arrise.   
ORM sessions may be more readable and easier to work with due to the mapping option. It can also help minimize errors due to syntax. However for complex queries it may be inefficient and because it is different than SQL it may have a learning curve (if thats where the individual started).  