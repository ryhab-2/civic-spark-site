# Laravel Backend Setup Guide

This guide explains how to set up a Laravel backend to work with your React frontend.

## Prerequisites

- PHP 8.2 or higher
- Composer
- MySQL 8.0 or MariaDB 10.3+
- Node.js and npm (for Laravel Mix)

## 1. Create Laravel Project

```bash
composer create-project laravel/laravel esc-project-backend
cd esc-project-backend
```

## 2. Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

Update your `.env` file:

```env
APP_NAME="ESC Project Backend"
APP_ENV=local
APP_KEY=base64:YOUR_APP_KEY
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=esc_project
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Laravel Sanctum for API authentication
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DRIVER=cookie
```

## 3. Install Required Packages

```bash
composer install
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## 4. Database Migrations

Create the database tables:

```bash
php artisan make:migration create_admin_users_table
php artisan make:migration create_projects_table  
php artisan make:migration create_events_table
php artisan make:migration create_calendar_table
php artisan make:migration create_visits_table
```

Add the migration content (see migration files below).

Run migrations:
```bash
php artisan migrate
```

## 5. Models and Controllers

Create models and controllers:
```bash
php artisan make:model AdminUser -c
php artisan make:model Project -c
php artisan make:model Event -c
php artisan make:model CalendarItem -c
php artisan make:model Visit -c
php artisan make:controller AuthController
```

## 6. API Routes

Add to `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CalendarItemController;
use App\Http\Controllers\VisitController;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/track-visit', [VisitController::class, 'track']);

// Protected admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Admin stats
    Route::get('/admin/stats', [AuthController::class, 'getDashboardStats']);
    
    // CRUD routes
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('events', EventController::class);
    Route::apiResource('calendar', CalendarItemController::class);
    
    // Visit analytics
    Route::get('/visits', [VisitController::class, 'index']);
    Route::get('/visits/stats', [VisitController::class, 'getStats']);
});
```

## 7. Configure CORS

In `config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## 8. Start Development Server

```bash
php artisan serve
```

Your Laravel API will be available at `http://localhost:8000/api`

## 9. Frontend Configuration

Update the API_BASE_URL in your React app (`src/lib/api.ts`) to point to your Laravel backend:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:8000/api';
```

## Required Laravel Files

The following files need to be created in your Laravel project:

### Migration Files
- `database/migrations/xxxx_create_admin_users_table.php`
- `database/migrations/xxxx_create_projects_table.php`
- `database/migrations/xxxx_create_events_table.php`
- `database/migrations/xxxx_create_calendar_table.php`
- `database/migrations/xxxx_create_visits_table.php`

### Models
- `app/Models/AdminUser.php`
- `app/Models/Project.php`
- `app/Models/Event.php`
- `app/Models/CalendarItem.php`
- `app/Models/Visit.php`

### Controllers
- `app/Http/Controllers/AuthController.php`
- `app/Http/Controllers/ProjectController.php`
- `app/Http/Controllers/EventController.php`
- `app/Http/Controllers/CalendarItemController.php`
- `app/Http/Controllers/VisitController.php`

Each file contains the necessary code for handling CRUD operations, authentication, and analytics.

## Testing

1. Start Laravel server: `php artisan serve`
2. Start React app: `npm start`
3. Visit `http://localhost:3000/admin/register` to create an admin account
4. Login at `http://localhost:3000/admin/login`
5. Test CRUD operations in the admin panel

## Security Notes

- Always use HTTPS in production
- Set proper CORS origins for production
- Use strong passwords and enable 2FA if needed
- Regularly update Laravel and dependencies
- Consider rate limiting for API endpoints