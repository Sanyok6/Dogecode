## Dogecode, a place for programmers to get together
### Made using django and next.js

## Setup instructions

> #### Run `git clone https://github.com/Sanyok6/Dogecode`
----

### Running the backend
```
cd backend
pipenv install
pipenv shell
python manage.py migrate
python manage.py collectstatic
python manage.py runserver
```

> #### Note: Use `python3` instead of `python` if you're on Linux or Mac

#### You can optionally run (Recommended) `python manage.py createsuperuser` to create an admin user More about admin users https://docs.djangoproject.com/en/4.0/intro/tutorial02/#creating-an-admin-user
----

### Running the frontend
> #### Note: Make sure that the backend is running
```
cd frontend
npm install
npm run dev
```
