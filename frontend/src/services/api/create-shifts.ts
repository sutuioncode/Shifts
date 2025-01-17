import type { CreateShift } from '../../models/shift'

export async function createShift(shift: CreateShift) {
    const create = await fetch(new URL('shifts/create-shift', import.meta.env.VITE_API_URL).href, {
        body: JSON.stringify(shift),
        headers: { "Content-Type": "application/json", },
        method: 'post'
    }).then((res) => res.json())

    return create
}