# Welcome to RFit Platform
**Live Demo: http://www.rfit-platform.com/**

## What is RFit Platform?
The RFit Platform is a tool built for personal trainers to keep track on their tight schedule and most of all their clients.
Using the platform, you can manage your weekly/daily schedule by adding/updating/removing appointments,clients and workouts.
it was important for me to build something simple but powerful.


## Brief
* Single Page Application
* MVC Architecture

## Backend:
* Node.js + Express
* MongoDB
* JWT for Auth

## Frontend:
* React.js
* Redux Thunk
* Material UI
* Responsive Design
* DevExtremeREACTIVE - React Scheduler

## Features:
* Auth - Login / Registration
* Schedule - Add, update, delete appointments. You can also update by drag & drop the appointment.
day/week/month view options.

* Clients - Add, update clients (We dont want to remove a client, just update his status to "Not Active" :) ).
filtering options using Material-Table.

* Workouts - Add, update, delete workouts.
filtering options using Material-Table.

###### Dashboard:
Here you can see your daily schedule, and some more information like today's workouts, how many clients you have, how many ACTIVE clients and more.

![](https://i.ibb.co/7QZ7vzZ/2.jpg)

###### Schedule:
**Add an Appointment:**
Double-click a cell in the timetable to open the appointment editing form or click the + button on the bottom right.
Fill out the form and click Create to add a new appointment.

**Update an Appointment:**
Double-click an appointment to open the appointment editing form;
Click an appointment to invoke its tooltip, and then click Edit in the tooltip to open the appointment editing form;
Drag an appointment to another cell to reschedule it. 
Drag an appointment's top or bottom border (left or right border for horizontal appointments) to change the appointment's duration.

**Delete an Appointment:**
Click an appointment to invoke its tooltip, and then click Delete in the tooltip to remove the appointment.

![](https://i.ibb.co/RTkMHTY/1.jpg)
![](https://i.ibb.co/jzqM5TM/9.jpg)

###### Clients:
In this page you can manage your clients.
you can filter the table by name, date, status, phone, email, gender.

**Add a client:**
Click on the plus button (top right, next to search input) and fill the new row that added to the table.

**Update a client:**
Click on the edit button (in Actions column) and edit the desired value.

![](https://i.ibb.co/v4n9vk3/3.jpg)

###### Client:
![](https://i.ibb.co/cvRmzM6/6.jpg)

###### Workouts:
In this page you can manage your workouts.
you can filter the table by client name or date.

**Add a workout:**
Click on the plus button (top right, next to search input) and fill the new row that added to the table.

**Update a workout:**
Click on the edit button (in Actions column) and edit the desired value.

**Delete a workout:**
Click on the delete button (in Actions column).

![](https://i.ibb.co/v4n9vk3/3.jpg)


![](https://i.ibb.co/k8GwxGK/7.jpg)

###### Account:
![](https://i.ibb.co/bWnwHnt/8.jpg)


