"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Zap, UserRoundCog } from "lucide-react"
import { useState } from "react"

interface SubscriptionButtonProps {

    isPro?: boolean
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url

        } catch (error) {
            console.log("[BILLING_ERROR]", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick} className="group hover:transition hover:scale-[1.02]">
            {isPro ? (
                <>
                    Manage Subscription <UserRoundCog className="w-4 h-4 ml-2 fill-white" />
                </>
            ) : (
                <>
                    Upgrade to Pro <Zap className="w-4 h-4 ml-2 fill-white group-hover:animate-ping" />
                </>
            )}
        </Button>

    )
}