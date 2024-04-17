import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname   //getting the current path

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'  
   // path which is publically accessible

  const token = request.cookies.get('token')?.value || ''
  //getting the token

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  } 
  // if it is public path and has a valid token then we bring them / route

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
//   if (!isPublicPath && token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }
    // if it is not public path and has a valid token then we bring them login route
}

 
// See "Matching Paths" below to learn more
export const config = {

    // these are the routes for which we want to use this middleware
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/logout'
    
  ]
}
