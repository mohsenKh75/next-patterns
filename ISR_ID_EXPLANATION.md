# Understanding `transformId` and `validateId` in ISR Utility

## Overview

In Next.js dynamic routes, URL parameters are always **strings**. However, your API or database might expect IDs as **numbers**, **UUIDs**, or other types. The ISR utility provides two optional functions to handle this:

1. **`validateId`** - Validates the ID format BEFORE transformation
2. **`transformId`** - Converts the string ID to the desired type

## Execution Order

The functions execute in this order:

```
URL Param (string) 
  → validateId() [if provided] 
  → transformId() [if provided] 
  → Final ID (TId type)
```

## `validateId` - ID Validation

**Purpose**: Validate that the URL parameter is in the correct format before processing.

**Signature**: `validateId?: (id: string) => boolean`

**When to use**:
- Check if ID is a valid number
- Validate UUID format
- Check ID length or pattern
- Prevent invalid IDs from reaching your API

**Returns**: `true` if valid, `false` if invalid (triggers `notFound()`)

### Example 1: Validating Numeric IDs

```tsx
const isrConfig = createISRConfig<Product, number, { productId: string }, Product>({
  // ... other config
  validateId: (id) => {
    // Check if it's a valid number
    const num = parseInt(id, 10);
    return !isNaN(num) && num > 0; // Must be positive number
  },
  transformId: (id) => parseInt(id, 10),
});
```

**What happens**:
- ✅ `/products/123` → validates as number → transforms to `123` (number)
- ❌ `/products/abc` → fails validation → `notFound()` (404)
- ❌ `/products/-5` → fails validation (if you check for positive) → `notFound()`
- ❌ `/products/0` → fails validation (if you check for > 0) → `notFound()`

### Example 2: Validating UUID Format

```tsx
const isrConfig = createISRConfig<User, string, { userId: string }, User>({
  // ... other config
  validateId: (id) => {
    // Validate UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  },
  // No transformId needed - UUIDs are already strings
});
```

**What happens**:
- ✅ `/users/550e8400-e29b-41d4-a716-446655440000` → validates → passes through
- ❌ `/users/invalid-id` → fails validation → `notFound()`

### Example 3: Validating ID Length

```tsx
const isrConfig = createISRConfig<Post, string, { postId: string }, Post>({
  // ... other config
  validateId: (id) => {
    // Must be exactly 24 characters (MongoDB ObjectId format)
    return id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
  },
});
```

## `transformId` - ID Transformation

**Purpose**: Convert the string URL parameter to the type your API expects.

**Signature**: `transformId?: (id: string) => TId`

**When to use**:
- Convert string to number
- Convert string to custom ID type
- Normalize ID format (trim, lowercase, etc.)
- Parse complex ID formats

**Returns**: The transformed ID in the desired type

### Example 1: String to Number (Most Common)

```tsx
const isrConfig = createISRConfig<Product, number, { productId: string }, Product>({
  // ... other config
  transformId: (id) => parseInt(id, 10),
  // Now fetchById receives a number, not a string
  fetchById: (id: number) => fetchProductById(id), // id is number!
});
```

**What happens**:
- URL: `/products/123`
- `transformId("123")` → returns `123` (number)
- `fetchById(123)` → API receives number

### Example 2: No Transformation (String IDs)

```tsx
const isrConfig = createISRConfig<User, string, { userId: string }, User>({
  // ... other config
  // No transformId - IDs stay as strings
  fetchById: (id: string) => fetchUserById(id), // id is string
});
```

**What happens**:
- URL: `/users/abc123`
- No transformation → `"abc123"` (string)
- `fetchById("abc123")` → API receives string

### Example 3: Custom ID Type

```tsx
type CustomId = { prefix: string; number: number };

const isrConfig = createISRConfig<Item, CustomId, { itemId: string }, Item>({
  // ... other config
  validateId: (id) => /^[A-Z]{2}-\d+$/.test(id), // Format: "AB-123"
  transformId: (id) => {
    const [prefix, number] = id.split('-');
    return { prefix, number: parseInt(number, 10) };
  },
  fetchById: (id: CustomId) => fetchItemById(id),
});
```

**What happens**:
- URL: `/items/PR-456`
- `validateId("PR-456")` → ✅ valid format
- `transformId("PR-456")` → returns `{ prefix: "PR", number: 456 }`
- `fetchById({ prefix: "PR", number: 456 })` → API receives custom object

## Current Product Page Implementation

In your product page:

```tsx
transformId: (id) => parseInt(id, 10),
validateId: (id) => !isNaN(parseInt(id, 10)),
```

**Flow**:
1. User visits `/products/123`
2. `validateId("123")` → checks if it's a valid number → ✅ `true`
3. `transformId("123")` → converts to number → `123`
4. `fetchById(123)` → API receives number

**Why both?**
- `validateId` catches invalid formats early (e.g., `/products/abc`)
- `transformId` ensures the API receives the correct type (number, not string)

## When to Use Each

### Use `validateId` when:
- ✅ You need to reject invalid IDs before API calls
- ✅ You want to prevent 400 errors from your API
- ✅ You need to validate format (UUID, ObjectId, etc.)
- ✅ You want better error handling (404 vs 400)

### Use `transformId` when:
- ✅ Your API expects a different type (number, not string)
- ✅ You need to parse or normalize the ID
- ✅ You want type safety in your fetch function

### Use both when:
- ✅ You have strict ID requirements (format + type)
- ✅ You want early validation + type conversion
- ✅ You want to prevent unnecessary API calls

## Real-World Examples

### Example 1: E-commerce Product (Current)
```tsx
// Product IDs are numbers
validateId: (id) => !isNaN(parseInt(id, 10)) && parseInt(id, 10) > 0,
transformId: (id) => parseInt(id, 10),
```

### Example 2: User Profile (UUID)
```tsx
// User IDs are UUIDs (strings)
validateId: (id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
// No transformId needed - already a string
```

### Example 3: Blog Post (Slug)
```tsx
// Post IDs are slugs (strings)
validateId: (id) => /^[a-z0-9-]+$/.test(id) && id.length > 0,
// No transformId needed - already a string
```

### Example 4: MongoDB Document
```tsx
// Document IDs are ObjectIds (strings, but need validation)
validateId: (id) => /^[0-9a-fA-F]{24}$/.test(id),
// No transformId needed - already a string
```

## Error Handling

If validation fails, the utility calls `notFound()` which:
- Returns a 404 status
- Shows your `not-found.tsx` page (if exists)
- Prevents the API call from happening

This is better than:
- ❌ Making an API call with invalid ID (wastes resources)
- ❌ Getting a 400 error from API (worse UX)
- ❌ Showing an error page (worse than 404)

## Type Safety

The TypeScript types ensure:
- `validateId` receives: `string`
- `transformId` receives: `string`, returns: `TId`
- `fetchById` receives: `TId` (the transformed type)

This gives you full type safety throughout the flow!

