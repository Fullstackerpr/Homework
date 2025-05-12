-- Kategoriya jadvali
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Mahsulot jadvali
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price DECIMAL(10, 2),
    stock INTEGER,
    category_id INTEGER REFERENCES category(id), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
