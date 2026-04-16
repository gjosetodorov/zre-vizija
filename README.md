# ZRE Vizija

ZRE Vizija is a web platform for the Regional Non-governmental Organization "Vizija", focused on supporting women through information, counseling access, and community visibility.

## Purpose

The website is designed to:
- provide clear information about services and support,
- make contacting the counseling center simple and safe,
- present public initiatives, publications, and donor contributions.

## What the Platform Includes

- **Home**: key messages, impact-focused sections, and calls to action.
- **About Us**: mission, values, organization story, projects, and team presentation.
- **Counseling Center**: service information, location details, and counseling request form.
- **Donations**: ways to support and donor-focused information.
- **Gallery**: yearly photo collections that can be expanded over time.
- **Publications**: PDF-based materials previewed as covers with direct open/read actions.
- **Contact**: contact details, map/location context, social links.

## Contact Form and Email Flow

The frontend form sends user submissions to the backend endpoint, which validates input and forwards the message via email.

Submitted fields:
- `name`
- `subject`
- `contactInfo` (email or phone)
- `message`

This enables the team to receive requests in one inbox and respond quickly.

## Tech Overview

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Email Service**: Nodemailer (SMTP via environment variables)
- **Styling**: responsive, component-based UI with a purple-themed design system

## Repository Structure

- `frontend/` - UI components, pages, assets, and client logic
- `backend/` - API routes and email sending logic

## Content Maintenance

The project is built so images, banners, gallery entries, publications, and text sections can be updated incrementally without changing the overall structure.
