# Overview

FishTracker is a full-stack fishing trip tracking application built with Angular and Spring Boot for Nebraska fishing.

The current iteration of the application has features such as:
- Recording fishing trips
- Logging catches by species within trips
- Tracking personal based catches (length based)
- View basic statistics
- Manage catch history

More features will be implemented in the future and this readme will be updated appropriately. The list of future features can be found below.

## Tech Stack
Frontend
- Angular
- TypeScript
- RxJS
- CSS

Backend
- Spring Boot
- Spring Data JPA
- Hibernate
- H2 / PostgreSQL

Testing
- JUnit
- Mockito
- MockMvc

## Active Features
- Create trips
- Update trip duration
- Create catches
- Delete catches
- Personal best tracking (recents only)
- Recent catches dashboard
- Responsive mobile layout

## Screenshots
Dashboard view:
<img width="1920" height="948" alt="image" src="https://github.com/user-attachments/assets/14f5ee7d-145f-4e96-819b-db39e1861dd1" />

Trips page with trip selected:
<img width="1900" height="951" alt="image" src="https://github.com/user-attachments/assets/1d543cb6-5835-4fdf-a4f6-7891f82d52ce" />

Catch entry modal:
<img width="1904" height="945" alt="image" src="https://github.com/user-attachments/assets/880ac60d-ba7f-443e-a2fd-96db4acfdaf6" />

Mobile view (dev tools version):

<img width="448" height="884" alt="image" src="https://github.com/user-attachments/assets/fea94723-acd7-4242-8881-417ca1fba750" />

## Prerequisites
These are the current versions the application is running on. Check version compatibilities if using more recent versions
- Node.js 24.14.0
- Angular CLI 21.2.2
- Java 21
- Maven
- Spring Boot 3.5.11

## Running Locally

The application is split up between to repositories. Pull down the [FishTracker ui](https://github.com/gklein18/FishTracker-ui) and the [FishTracker backend](https://github.com/gklein18/FishTracker).

```bash
git clone https://github.com/gklein18/FishTracker-ui.git
git clone https://github.com/gklein18/FishTracker.git
```
For front end configuration, install Angular CLI

```bash
npm install -g @angular/cli
```
Verify all prerequisite versions match. If they do run the frontend:
```bash
ng serve
```
Once this is running, move on to backend setup.

For backend setup, verify maven is building successfully within the terminal. Once you can successfully build, we must take steps to get correct local data for the first run and moving forward. Within the files, locate the application.properties file at src/main/resources/application.properties. Within this file, uncomment the following two lines

```properties
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always
```
Now run the application through the terminal

```bash
./mvnw spring-boot:run
```
This will execute the sql script that sets up the fish data and creates a base user. There is no active feature to create a new user yet. This is for demo purposes only.

IMPORTANT DETAIL:
If you do not want your data to be wiped every time your re-run the application, be sure to comment out the two lines mentioned previously within the application.properties file. If those lines are commented, data will persist locally between sessions. This can be used to reset the data when desired as well.

To access the application, navigate to [http://localhost:4200/](http://localhost:4200/) in your browser of choice.

## Future Enhancements
Here is a list of planned features to be developed at a later date:
- map/coordinate function for trips and catches
- improved stats with a dedicated stats view for the active user
- lure/bait used for each catch
- history of locations
- local weather reports
- detailed fish information
- multiple user support
- user authentication and authorization
- photo option for catches recorded
