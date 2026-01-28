📝 Angular Task Manager Application

A feature-rich Task Manager application built with Angular, focusing on clean architecture, reusable components, and real-world frontend patterns. The project demonstrates how to build a scalable Angular app with RESTful APIs, proper component communication, and a modern UI.

🚀 Features

✅ Create, read, update, and delete tasks (CRUD)

🔍 Search tasks by title

🎯 Filter tasks by status (All / Active / Completed)

↕️ Sort tasks by priority or status

💬 Add and manage comments for each task

⚡ Responsive and modern UI using Tailwind CSS

🧩 Clean component-based architecture

🛠 Robust API error handling

🏗 Architecture Overview

The application follows a container–presentational component pattern:

TaskManagerComponent – container component handling state and business logic

TaskHeaderComponent – displays task count and error messages

TaskFormComponent – handles task creation and editing

TaskFilterComponent – manages search, filter, and sorting UI

TaskListComponent – renders the task list

TaskItemComponent – represents a single task

TaskCommentsComponent – manages comments for individual tasks

All API interactions are centralized in Angular services.
