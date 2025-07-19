# Tondory Email Templates

Custom email templates for Supabase Auth designed specifically for Tondory's brand and user experience.

## 📧 Available Templates

### 1. **confirmation.html** - Email Confirmation
- **Purpose**: Verify new user email addresses during registration
- **Variables**: `{{ .ConfirmationURL }}`
- **Features**: Welcome message, feature highlights, security notes
- **Expiry**: 24 hours

### 2. **recovery.html** - Password Reset
- **Purpose**: Reset forgotten passwords securely
- **Variables**: `{{ .ConfirmationURL }}`
- **Features**: Security tips, warning notifications, password guidelines
- **Expiry**: 1 hour

### 3. **magic_link.html** - Magic Link Login
- **Purpose**: Passwordless authentication via email
- **Variables**: `{{ .ConfirmationURL }}`
- **Features**: Modern design, benefits explanation, animated elements
- **Expiry**: 15 minutes

### 4. **invite.html** - User Invitation
- **Purpose**: Invite new users to join the platform
- **Variables**: `{{ .ConfirmationURL }}`, `{{ .InviterName }}`, `{{ .InviterInitials }}`
- **Features**: Personalized invitation, stats showcase, animated confetti
- **Expiry**: 7 days

### 5. **email_change.html** - Email Change Confirmation
- **Purpose**: Confirm email address changes
- **Variables**: `{{ .ConfirmationURL }}`, `{{ .OldEmail }}`, `{{ .NewEmail }}`
- **Features**: Before/after email display, step-by-step process, security info
- **Expiry**: 24 hours

## 🎨 Design Features

### Brand Consistency
- **Tondory Logo**: Custom SVG boat icon
- **Color Scheme**: SwiftPay design system colors
- **Typography**: System fonts with proper hierarchy
- **Gradients**: Unique gradient for each email type

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Large buttons and tap targets
- **Readable**: High contrast and legible typography

### Interactive Elements
- **Hover effects**: Button animations and transitions
- **Visual feedback**: Loading states and confirmations
- **Accessibility**: Proper ARIA labels and semantic HTML

## 🔧 Setup Instructions

### 1. Upload to Supabase
1. Go to your Supabase Dashboard
2. Navigate to **Authentication > Settings > Email Templates**
3. For each template type, paste the corresponding HTML content
4. Save and test the templates

### 2. Template Mapping
```
Supabase Template Type → File Name
- Confirm signup → confirmation.html
- Reset password → recovery.html
- Magic Link → magic_link.html
- Invite user → invite.html
- Change email address → email_change.html
```

### 3. Variable Configuration
Supabase automatically provides these variables:
- `{{ .ConfirmationURL }}` - The action URL (always available)
- `{{ .OldEmail }}` - Current email (email change only)
- `{{ .NewEmail }}` - New email (email change only)
- `{{ .InviterName }}` - Inviter's name (invite only)
- `{{ .InviterInitials }}` - Inviter's initials (invite only)

## 🎯 Best Practices

### Email Deliverability
- **SPF/DKIM**: Configure proper email authentication
- **From Address**: Use a verified domain email
- **Subject Lines**: Keep concise and clear
- **Content**: Balance text and images for spam filters

### User Experience
- **Clear CTAs**: Make action buttons prominent
- **Mobile-first**: Test on various devices
- **Loading fallbacks**: Include text links as backups
- **Security messaging**: Explain expiry times and security

### Testing
- **Preview**: Test in multiple email clients
- **Variables**: Verify all template variables work
- **Links**: Ensure all URLs are functional
- **Responsive**: Check mobile and desktop views

## 🔒 Security Considerations

### Link Expiry Times
- **Magic Links**: 15 minutes (most secure)
- **Password Reset**: 1 hour (balance of security/usability)
- **Email Confirmation**: 24 hours (user convenience)
- **Email Change**: 24 hours (important account change)
- **Invitations**: 7 days (allows time for recipients)

### Template Security
- **No sensitive data**: Never include passwords or tokens in plain text
- **HTTPS only**: All links use secure protocols
- **Clear messaging**: Explain what each action does
- **Warning notices**: Alert users about suspicious activity

## 📱 Customization

### Brand Updates
To update branding across all templates:
1. **Logo**: Replace the SVG path in each template
2. **Colors**: Update CSS custom properties
3. **Typography**: Modify font-family declarations
4. **Copy**: Update text content for your brand voice

### Color Scheme
Current color scheme per template:
- **Confirmation**: Blue (`#0ea5e9`) - Trust and reliability
- **Recovery**: Red (`#ef4444`) - Urgency and security
- **Magic Link**: Purple (`#8b5cf6`) - Innovation and magic
- **Invite**: Green (`#22c55e`) - Growth and welcome
- **Email Change**: Orange (`#f59e0b`) - Attention and change

### Adding Features
Each template is built with:
- **Modular CSS**: Easy to extend with new components
- **Semantic HTML**: Accessible and SEO-friendly structure
- **Progressive Enhancement**: Graceful degradation for older clients

## 🚀 Deployment Checklist

- [ ] Upload all 5 templates to Supabase
- [ ] Configure email settings (SMTP, domain verification)
- [ ] Test each template with real email addresses
- [ ] Verify mobile responsiveness
- [ ] Check spam folder delivery
- [ ] Test all action links work correctly
- [ ] Confirm expiry times are appropriate
- [ ] Review and approve final copy
- [ ] Monitor delivery rates and user feedback

## 🔄 Maintenance

### Regular Updates
- **Security patches**: Keep templates updated for security
- **Brand changes**: Update logos, colors, and copy as needed
- **Feature additions**: Add new functionality and messaging
- **Performance**: Optimize images and code for faster loading

### Monitoring
- **Delivery rates**: Track email delivery success
- **Click-through rates**: Monitor user engagement
- **User feedback**: Collect feedback on email experience
- **Error reports**: Monitor failed email sends

## 📞 Support

For questions about these email templates:
- **Technical Issues**: Check Supabase Auth documentation
- **Design Updates**: Modify CSS and HTML as needed
- **Brand Guidelines**: Ensure consistency with Tondory brand
- **User Feedback**: Monitor and respond to user experience issues

---

**Built with ❤️ for the Tondory community**