SELECT first_name, last_name, room_no
FROM customers
JOIN reservations
ON customers.customer_id = reservations.customer_id
WHERE reservations.date_in BETWEEN "2022-01-01" AND "2022-01-30"
OR reservations.date_out BETWEEN "2022-01-02" AND "2022-01-31"
ORDER BY first_name, last_name, room_no;