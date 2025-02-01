"use client"
import { api } from "~/trpc/react"
import { useState, useMemo } from "react"

// This is not to be used in place of the actual sign up. It just serves as a placeholder to show how the routes I've developed could be used. Will be deleted at the conclusion of the project
export function SignUp(){
  const [name, setName] = useState("")
  const [count, setCount] = useState(0);
  const memoizedCount = useMemo(() => count, [count])
  const createUser = api.user.createUser.useMutation({
    onSuccess: async val => {
      console.log("User created successfully")
      setName(val.user.name)
      setCount(count+1)
    }
  })
  return(
    <div>
      <h1>Sign Up</h1>
      {
        name != "" &&
        <>
          <p>User Created:</p>
          <p>Name: {name}</p>
          <p>Email: will{count - 1}@gmail.com</p>
        </>
      }
      <button disabled={createUser.isPending} onClick={() => {
        createUser.mutate({
          name: `Williams${count}`,
          email: `will${count}@gmail.com`,
          password: "pass12345",
          role: "VOLUNTEER"
        })
      }}>{createUser.isPending ? "Creating..." : "Create User"}</button>
    </div>
  )
}