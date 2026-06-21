import { idToUuid } from "notion-utils"
import { ExtendedRecordMap, ID } from "notion-types"

export default function getAllPageIds(
  response: ExtendedRecordMap,
  viewId?: string
): ID[] {
  const collectionQuery = response.collection_query
  const views = Object.values(collectionQuery ?? {})[0]

  let pageIds: ID[] = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views?.[vId]?.blockIds ?? []
  } else {
    const pageSet = new Set<ID>()
    Object.values(views ?? {}).forEach((view: any) => {
      const viewValue = view?.value ?? view
      viewValue?.collection_group_results?.blockIds?.forEach((id: ID) =>
        pageSet.add(id)
      )
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
