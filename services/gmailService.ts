// Email Service for sending contact form emails via Gmail API
// This service calls our backend API to send emails

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

// Send contact form email via our API
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    // Send request to our API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Email sent successfully! We will get back to you soon.',
        messageId: result.messageId
      };
    } else {
      return {
        success: false,
        message: result.error || 'Failed to send email. Please try again.',
        error: result.error
      };
    }

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Fallback method using mailto (opens user's email client)
export const sendEmailFallback = (formData: ContactFormData): void => {
  const recipients = [
    'hassanalisajid786@gmail.com',
    'hassanasim337@gmail.com',
    'team@devisesolutions.co'
  ];
  
  const subject = encodeURIComponent(`Contact from ${formData.name} - DEVise Solutions`);
  const body = encodeURIComponent(`
Hi there,

I'm reaching out through your website contact form.

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Best regards,
${formData.name}
  `);
  
  const mailtoLink = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
};

// Utility function to validate contact form data
export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name?.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (!formData.message?.trim()) {
    errors.push('Message is required');
  } else if (formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
