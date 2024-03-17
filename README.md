# Jamaica Volunteering Platform
# Project Info
A platform to find volunteering agencies and events near you, post about your good deeds and make lasting connections. This project was inspired by my, and other students, difficulties in finding a place to volunteer for UTechs community service module.
# Live Demo
Available at https://volunteer-platform-frontend.onrender.com/
# Features
**Authentification**
* Users can register and login with their email and password

**Profile**
* Users can add first name, last name, profile image, email, phone number about, skills, date of birth
* Users can see the profiles of other users

**Posts**
* Users can write posts and add an image
* Users can see the posts of others

**Agencies Map**
* Users can find volunteering agencies by looking at an 'Agencies map'
* Users can see the agency's name, about, link to agency page, # of members, and rating, by clicking a marker

**Agency Profile**
* Users can see agency profiles with info about the agencies like: name, contact, about, posts, upcoming events and open positions

**Events Map**
* Users can find volunteering events by looking at an 'Events map'
* Users can see the event's title, date, description, location, and link to agency page, by clicking a marker

# Behind the scenes

**Frontend**
* Vite
* Material UI components are used for styling
* Redux and Redux persist for state management
* Formik is used to handle form state
* Yup is used to validate user input and warn them if their input is not valid
* Cloudinary's upload widget is used to upload images
* Mapbox is used for agency and event maps
* Axios is used for requests
* Testing is done with jest, react testing library, redux mock store and  cyrpress
* Linting is done with eslint

**Backend**
* Express and Node
* Bcrypt is used to hash passwords before storage.
* JsonWebTokens are used to authenticate users. The tokens are set to expire after ten minutes 
* Refresh tokens are used to verfiy that a user is still authenticated. If a request is sent 10 minutes after a user has logged in, the request will fail
However an axios inteceptor with fetch a new access token using the users refresh token, and resend the request. Refresh tokens are valid for one day
* Cloudinary.com is used to store images
* Non image data is stored in a PostgresDB hosted on Supabase
* Sequelize is used as the Postgres ORM
* Testing is done with node:test
* Linting is done with eslint
* Cross Origin Resource vulnurabilty is handled with express cors
* Logging is done with morgan


**Deployment**
* Github actions CI/CD for automated testing before merge
* Both frontend and backend are deployed on Render.com and auto redeploy after commit to main branch



