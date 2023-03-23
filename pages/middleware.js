import { NextResponse } from "next/server"

export async function middleware(req,res){
    console.log("middleware ran")
    NextResponse.next()
}