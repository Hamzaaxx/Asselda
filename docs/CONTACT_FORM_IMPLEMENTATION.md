# Contact Form Implementation

## Overview

This implementation provides a complete contact form with:

-   **reCAPTCHA v3 Protection**: Bot detection and spam prevention
-   **Email Notifications**: Automatic emails sent to admin and user confirmation
-   **Form Validation**: Client-side and server-side validation
-   **Responsive Design**: Works on all devices
-   **Multilingual Support**: French and Arabic versions

## Features Implemented

### Frontend (React/Next.js)

1. **reCAPTCHA v3 Integration**

    - GoogleReCaptchaProvider wrapper for the entire form
    - Automatic token generation on form submission
    - Server-side verification with score checking (threshold: 0.5)

2. **Form Validation**

    - Required fields: Full Name, Email, Subject, Message
    - Optional fields: Phone number (validated if provided)
    - Message length: 20-1000 characters
    - Phone format: 06XXXXXXXX or 07XXXXXXXX

3. **User Feedback**

    - Loading state during submission
    - Success/error messages displayed on form
    - Character count for message field
    - Automatic form reset on success

4. **Accessible Components**
    - Proper form labels and ARIA attributes
    - Disabled state during submission
    - Clear error messages
    - Visual feedback for required fields

### Backend (Node.js/Strapi)

1. **reCAPTCHA Verification**

    - Server-side token verification
    - Score checking (0.5+ threshold)
    - Error handling and logging

2. **Email Service (NodeMailer)**

    - SMTP configuration with Gmail support
    - Professional HTML email templates
    - Separate emails for admin and user confirmation
    - Proper error handling and logging

3. **Contact Submission Handler**

    - Validates all form data
    - Verifies reCAPTCHA token
    - Saves submission to database
    - Sends notification emails
    - Returns appropriate response codes

4. **Database Schema**
    - Stores: fullName, email, phone (optional), subject, message
    - Tracks: read status, timestamps
    - Validation: minLength/maxLength constraints

## Setup Instructions

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   SMTP credentials (Gmail recommended)
-   reCAPTCHA v3 keys from Google

### Backend Setup

1. **Update Environment Variables** (`apps/backend/.env`)

    ```bash
    # Email Configuration (Gmail)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-email@gmail.com
    SMTP_PASS=your-app-password  # Use app-specific password for Gmail
    SMTP_FROM=noreply@asselda.org
    SMTP_FROM_NAME=Association Asselda

    # reCAPTCHA
    RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

    # Admin Settings
    ADMIN_EMAIL=admin@asselda.org
    ```

2. **Get Gmail App Password**

    - Go to https://myaccount.google.com/apppasswords
    - Select "Mail" and "Windows Computer"
    - Copy the generated password
    - Use this as SMTP_PASS

3. **Get reCAPTCHA Keys**

    - Go to https://www.google.com/recaptcha/admin
    - Create a new site
    - Select reCAPTCHA v3
    - Add your domain
    - Copy Site Key and Secret Key

4. **Install Backend Dependencies**

    ```bash
    cd apps/backend
    npm install
    ```

5. **Start Backend**
    ```bash
    npm run dev
    ```

### Frontend Setup

1. **Update Environment Variables** (`apps/frontend/.env.local`)

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:1337
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
    ```

2. **Install Frontend Dependencies**

    ```bash
    cd apps/frontend
    npm install
    ```

3. **Start Frontend Development Server**

    ```bash
    npm run dev
    ```

4. **Access the Contact Forms**
    - French: http://localhost:3000/fr/contact
    - Arabic: http://localhost:3000/ar/contact

## Files Modified/Created

### Frontend

-   `apps/frontend/app/fr/contact/page.tsx` - French contact form with reCAPTCHA
-   `apps/frontend/app/ar/contact/page.tsx` - Arabic contact form with reCAPTCHA
-   `apps/frontend/.env.example` - Environment variables template
-   `apps/frontend/.env.local` - Development environment variables

### Backend

-   `apps/backend/src/api/contact-submission/controllers/contact-submission.js` - Enhanced controller with validation and email
-   `apps/backend/src/api/contact-submission/emailService.js` - Email service with HTML templates
-   `apps/backend/src/api/contact-submission/recaptchaVerifier.js` - reCAPTCHA v3 verification
-   `apps/backend/src/api/contact-submission/content-types/contact-submission/schema.json` - Updated schema

## API Endpoints

### POST `/api/contact-submissions`

Submit a contact form

**Request Body:**

```json
{
	"fullName": "John Doe",
	"email": "john@example.com",
	"phone": "0612345678",
	"subject": "partnership",
	"message": "I would like to discuss a partnership opportunity...",
	"recaptchaToken": "token-from-recaptcha"
}
```

**Response (Success):**

```json
{
	"success": true,
	"message": "Contact submission received successfully",
	"data": {
		"id": 1,
		"fullName": "John Doe",
		"email": "john@example.com",
		"phone": "0612345678",
		"subject": "partnership",
		"message": "...",
		"read": false,
		"createdAt": "2024-06-12T...",
		"updatedAt": "2024-06-12T..."
	}
}
```

**Response (Error):**

```json
{
	"data": null,
	"error": {
		"status": 400,
		"name": "ValidationError",
		"message": "reCAPTCHA verification failed: Low score or verification failed"
	}
}
```

## Email Configuration

### Admin Email

Subject: `Nouveau message de contact: {subject}`

Contains:

-   Sender name, email, phone
-   Subject of message
-   Full message content
-   Reply-to set to sender's email

### User Confirmation Email

Subject: `Confirmation de réception - Association Asselda`

Contains:

-   Personalized greeting
-   Submission recap
-   Contact information
-   Response time expectation

## Testing

### Test Form Submission

1. Navigate to contact form (French or Arabic)
2. Fill in all required fields:
    - Full Name: Min 3 characters
    - Email: Valid email format
    - Phone: Optional (06 or 07 format)
    - Subject: Select from dropdown
    - Message: 20-1000 characters
3. Click Submit
4. Verify:
    - Loading indicator appears
    - Success message displayed
    - Admin receives email
    - User receives confirmation email
    - Form is reset

### Test Validation

-   Try submitting with missing fields
-   Try with message < 20 characters
-   Try with message > 1000 characters
-   Try with invalid email
-   Try with invalid phone format

### Test reCAPTCHA

-   Monitor browser console for token generation
-   Check backend logs for reCAPTCHA verification
-   Test with different reCAPTCHA scores

## Troubleshooting

### Emails Not Sending

1. Check SMTP credentials in `.env`
2. Enable "Less secure app access" in Gmail (if applicable)
3. Use app-specific password for Gmail
4. Check backend logs for email service errors
5. Verify ADMIN_EMAIL is set correctly

### reCAPTCHA Not Working

1. Verify NEXT_PUBLIC_RECAPTCHA_SITE_KEY matches your Google reCAPTCHA site
2. Ensure RECAPTCHA_SECRET_KEY is correct in backend
3. Check browser console for client-side errors
4. Verify domain is added to reCAPTCHA settings

### Form Not Submitting

1. Check browser console for errors
2. Verify API_URL is correct
3. Check backend CORS configuration
4. Verify backend is running on correct port

### Database Errors

1. Ensure database is running
2. Run Strapi migrations: `npm run strapi migrate`
3. Check Strapi logs for detailed errors

## Security Considerations

1. **reCAPTCHA v3**: Score-based detection, no user interaction
2. **Server-side Validation**: All inputs validated on backend
3. **SMTP Authentication**: Credentials in environment variables only
4. **Input Sanitization**: HTML entities escaped in email templates
5. **Rate Limiting**: Consider adding rate limiting for production
6. **CORS**: Configure appropriate CORS headers in production

## Performance Notes

-   reCAPTCHA tokens generated asynchronously
-   Email sending is non-blocking (doesn't fail form submission)
-   Form data validated before server roundtrip
-   Database schema optimized with proper indexes

## Future Enhancements

1. Email attachment support
2. File upload capability
3. Multi-language email templates
4. Admin dashboard for form submissions
5. Automated follow-up emails
6. Webhook notifications
7. Integration with external services (Slack, Discord)
8. Rate limiting per IP
9. Spam filtering with ML models
10. Email template customization

## Support

For issues or questions, please contact the development team or refer to the troubleshooting section above.
