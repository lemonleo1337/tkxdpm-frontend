import { ServiceDataType } from "api/service";
import { TaxonomyType } from "assets/data/types";

export const convertServiceDataTypeToTaxonomyType = (oldData: ServiceDataType[]): TaxonomyType[] => {
    return oldData.map((item) => {
        return {
            id: item.id,
            href: `/services/${item.id}`,
            name: item.name,
            taxonomy: "category",
            count: item.bookingCount ? item.bookingCount : 0,
            thumbnail: item.thumbnail || undefined,
            desc: item.description || undefined,
        };
    });
}
