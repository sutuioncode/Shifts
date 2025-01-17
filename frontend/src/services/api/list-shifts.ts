import { ShiftList } from '../../models/shift'

export async function listShift(start: string, end: string) {
    const create = await fetch(new URL(`shifts/list-shifts-by-date?start=${start}&end=${end}`, import.meta.env.VITE_API_URL).href, {
        headers: { "Content-Type": "application/json", },
        method: 'get'
    }).then(async (res) => ShiftList.parse(await res.json()))

    return create
}