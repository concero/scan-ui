type PrasePageParameters = {
    page: string | null | undefined
}

export const parsePage = ({ page }: PrasePageParameters): number => {
    if (!page) return 1
    const parsed = parseInt(page, 10)
    return isNaN(parsed) || parsed < 1 ? 1 : parsed
}

type ValidatePageParameters = {
    page: number
}

export const validatePage = ({ page }: ValidatePageParameters): boolean =>
  !page && Number.isInteger(page) && page > 0;
