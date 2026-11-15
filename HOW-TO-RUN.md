# SR Nivas — HTML + Bootstrap + Java Spring Boot + MySQL

## What you need to install
1. Java 17 (JDK)
2. MySQL Server + MySQL Workbench
3. IntelliJ IDEA Community (free) or Eclipse

## Steps
1. Start MySQL.
2. Open `src/main/resources/application.properties` and type your MySQL username and password.
3. Open this folder in IntelliJ (File > Open > choose `pom.xml`). Wait for it to download things.
4. Open `SrNivasApplication.java` and click the green Run button.
5. Open http://localhost:8080 in your browser. Your website appears.
6. Fill in the contact form and send it.
7. See saved messages: http://localhost:8080/api/visits
   or in MySQL Workbench: `SELECT * FROM srnivas.visit_requests;`

## Where things are
| What | File |
|---|---|
| Web pages | src/main/resources/static/*.html |
| Colors / design | src/main/resources/static/css/style.css |
| Homes list (rents, photos) | src/main/resources/static/js/rentals.js |
| Form sending code | src/main/resources/static/js/main.js (bottom) |
| Table design | model/VisitRequest.java |
| Saving to MySQL | repository/VisitRequestRepository.java |
| Web address /api/visits | controller/VisitRequestController.java |
| MySQL login | application.properties |

## How it flows
Browser form -> JavaScript fetch() -> Spring Boot Controller -> Repository -> MySQL table
