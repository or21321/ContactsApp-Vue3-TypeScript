export interface Contact {
    _id?: string
    name: string
    email: string
    phone: string
    moves: Array<any>
}

export type Contacts = Array<Contact>

// moves should contain move interface in an array