---
title: "TRACKIFY — Student Productivity & Placement Tracker"
document: "Project Report — Part 1"
sections: ["Front matter", "Introduction", "Literature Survey", "Problem Definition", "Objectives", "Scope", "SRS"]
version: "1.0"
date: "2026-04-02"
---

## Title Page

### TRACKIFY — Student Productivity & Placement Tracker  
**Offline-first dashboard for tasks, study, DSA progress, placements, and analytics with deterministic AI coaching**

**Submitted by**: Sonam Narula  
**Project Type**: College Project  
**Technology**: React + TypeScript + Vite, Chart.js  
**Persistence**: Browser `localStorage`

---

## Certificate / Declaration

This is to certify that the project titled **“Trackify — Student Productivity & Placement Tracker”** is an authentic record of work carried out during the academic project period. The project is implemented as a client-side web application with offline-first storage and includes task tracking, study logging, placement tracking, analytics, and deterministic coaching insights.

---

## Acknowledgement

I would like to thank my faculty mentors for their guidance and evaluation support. I also acknowledge the open documentation and community resources for React, TypeScript, Vite, and Chart.js that assisted during development.

---

## Abstract

Placement preparation requires a disciplined routine of completing tasks, studying consistently, practicing DSA, and tracking job applications. Students often use multiple disconnected tools (notes, spreadsheets, reminders), which weakens visibility, consistency, and accountability.

**Trackify** is an offline-first, frontend-only web application that consolidates student productivity and placement preparation into a single system. The application provides:

- **Task Manager** with priorities, completion tracking, filters, and progress visualization.
- **Study Tracker** with per-day logging (hours + DSA questions), summary statistics, and streak logic.
- **Placement Tracker** with status pipeline (applied/interview/selected/rejected), notes, and quick filtering.
- **Analytics** dashboards with Chart.js (bar/line/doughnut) to visualize trends and breakdowns.
- **AI Productivity Coach** implemented with deterministic rules (no external API calls), producing strict, actionable insights based on recent activity.

Trackify is built with **React 18 + TypeScript**, bundled with **Vite**, and persists data in **browser `localStorage`**, enabling privacy and zero-backend deployment.

---

## Table of Contents (Part 1)

- 1. Introduction  
- 2. Literature Survey / Related Work  
- 3. Problem Definition  
- 4. Objectives  
- 5. Scope  
- 6. Software Requirement Specification (SRS)  

---

## 1. Introduction

### 1.1 Background

The placement process for students is a long pipeline. Success depends on:

- daily execution (finishing tasks),
- consistent preparation (study + DSA),
- structured job searching and application tracking,
- periodic evaluation using measurable metrics.

In practice, students keep information scattered. The lack of a unified system leads to missed tasks, inconsistent study routines, and incomplete tracking of application statuses.

### 1.2 Motivation

Students benefit most from simple tools that:

- require minimal setup,
- work without internet,
- provide quick feedback,
- show trends and weak areas early.

Trackify is motivated by these constraints and is designed to be:

- **offline-first** (localStorage persistence),
- **visual and measurable** (analytics charts),
- **actionable** (strict insights),
- **fast and clean** (React + Vite performance).

### 1.3 Project Overview

Trackify is a single-page application with these pages:

- **Dashboard**: summary stats + AI coach insights + recent tasks
- **Task Manager**: prioritized tasks, filters, completion progress
- **Study Tracker**: session logging, totals/averages, streak
- **Placement Tracker**: applications board with status updates
- **Analytics**: charts for study, DSA, tasks, placements

All data remains on the user’s device.

---

## 2. Literature Survey / Related Work

### 2.1 Productivity and task management tools

Generic to-do list tools help capture tasks but often do not connect tasks with learning outcomes or placement goals. Students require more contextual tracking (DSA, study hours, placement pipeline).

### 2.2 Habit and streak systems

Habit trackers encourage regular activity using streaks and visual reinforcement. However, many provide limited academic-specific metrics (e.g., DSA counts, study hour breakdown). Trackify adapts streak logic to study logging.

### 2.3 Placement tracking approaches

Most students rely on spreadsheets. While spreadsheets are flexible, they:

- require manual formatting,
- are not optimized for quick status updates,
- do not provide built-in analytics or insights.

Trackify provides a structured placement pipeline with stage counts and status badges.

### 2.4 Visual analytics

Charts reduce cognitive load and allow trend spotting. Trackify uses:

- bar charts for study hours,
- line charts for DSA trends,
- doughnut charts for distribution breakdowns.

### 2.5 AI-assisted coaching

Cloud AI coaching is powerful but raises privacy and availability issues. Trackify chooses deterministic rules for:

- offline availability,
- predictable feedback,
- no external data dependency.

---

## 3. Problem Definition

### 3.1 Identified issues

- Scattered tracking across many tools.
- No integrated dashboard for placement readiness.
- No strict feedback mechanism for weak spots (low consistency, too many pending tasks).
- Lack of privacy control when using cloud-dependent tools.

### 3.2 Problem statement

Develop an offline-first web application that consolidates task execution, study + DSA logging, placement tracking, and analytics, and generates deterministic coaching insights using only local computation and local storage.

---

## 4. Objectives

### 4.1 Primary objectives

- Build a dashboard-driven system for student productivity and placements.
- Implement tasks, study logs, placements tracking with persistent storage.
- Implement analytics charts for progress visualization.
- Implement deterministic coaching insights without external APIs.

### 4.2 Secondary objectives

- Provide dark/light themes with persistent preference.
- Provide responsive UI for mobile and desktop.
- Provide clear empty states and toast feedback for user actions.

---

## 5. Scope

### 5.1 In scope

- Frontend-only SPA (React + TypeScript).
- LocalStorage persistence for all core datasets.
- Five pages: Dashboard, Tasks, Study, Placements, Analytics.
- Filters, progress indicators, and charts.
- Deterministic AI coach insights.

### 5.2 Out of scope

- Login/authentication and multi-device sync.
- Server-side database and API backend.
- Scheduled notifications and reminders.
- Export/import workflows (CSV/PDF) (future enhancement).

---

## 6. Software Requirement Specification (SRS)

### 6.1 Intended users

- College students preparing for internships and placements.
- Students who want a minimal, offline personal tracking tool.

### 6.2 Operating environment

- Runs in a modern web browser.
- Works offline once loaded.
- Deployed as static assets (build output).

### 6.3 Assumptions and dependencies

- Browser supports `localStorage`.
- User is not in a restrictive/private mode that clears storage.
- Charts depend on Chart.js rendering support.

### 6.4 Functional requirements

#### FR1: Theme

- FR1.1 The system shall allow toggling between dark and light themes.
- FR1.2 The system shall persist theme preference in `localStorage`.

#### FR2: Tasks

- FR2.1 The system shall allow users to add a task with title and priority (low/medium/high).
- FR2.2 The system shall allow marking tasks complete/incomplete.
- FR2.3 The system shall allow filtering tasks (all/pending/completed).
- FR2.4 The system shall allow deletion of tasks.
- FR2.5 The system shall show completion progress and counts.

#### FR3: Study logs

- FR3.1 The system shall allow logging study sessions by date.
- FR3.2 The system shall accept hours (numeric) and DSA questions (integer).
- FR3.3 The system shall merge sessions if the same date is logged again.
- FR3.4 The system shall compute total hours, total DSA, average hours/day, and active days.
- FR3.5 The system shall compute and persist a study streak for daily logging.
- FR3.6 The system shall allow deletion of study logs.

#### FR4: Placements

- FR4.1 The system shall allow adding an application with company, role, status, and optional notes.
- FR4.2 The system shall allow updating application status.
- FR4.3 The system shall allow filtering applications by status.
- FR4.4 The system shall allow deletion of applications.
- FR4.5 The system shall show counts per status stage.

#### FR5: Analytics

- FR5.1 The system shall generate charts for last 7 days study hours and DSA progress.
- FR5.2 The system shall generate breakdown charts for task priorities and placement statuses.
- FR5.3 The charts shall be readable in both themes.

#### FR6: AI Productivity Coach

- FR6.1 The system shall generate insights from tasks, study logs, and streak.
- FR6.2 The system shall not call any external API for generating insights.
- FR6.3 The system shall show insights on the dashboard and handle empty-data scenarios.

### 6.5 Non-functional requirements

- **NFR1 Performance**: CRUD operations should complete instantly.
- **NFR2 Reliability**: Data should persist across page refresh.
- **NFR3 Usability**: Clear navigation, consistent layout, and meaningful empty states.
- **NFR4 Portability**: Deploy as static site on common hosts.
- **NFR5 Privacy**: Data remains on device; insights generated locally.

### 6.6 Feasibility

- **Technical feasibility**: High; built entirely with established web technologies.
- **Operational feasibility**: High; no server maintenance required.
- **Economic feasibility**: High; no infrastructure costs for a static deployment.

