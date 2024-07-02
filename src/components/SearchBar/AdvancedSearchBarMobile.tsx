import { getRecommendActivitiesByKeywordWithDebounce } from '@action/activity';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import { H2, H4 } from '@components/ui/typography';
import cn from '@lib/utils';
import { XIcon } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';
import { SearchField, useSearch } from './SearchProvider';
import {
  ActivityKeyword,
  ActivityPicture,
  AdvancedActivityMobileField,
} from './fields/ActivityField';
import { AdvancedCategoryMobileField } from './fields/CategoryFieldMenu';
import { AdvancedDateMobileField } from './fields/DateFieldMenu';
import { AdvancedDistanceMobileField } from './fields/DistanceFieldMenu';
import { AdvancedEventTypeMobileField } from './fields/EventTypeFieldMenu';
import { AdvancedLocationMobileField } from './fields/LocationFieldMenu';
import { AdvancedSortMobileField } from './fields/SortFieldMenu';
import { SearchParams } from './fields/utils';

export type AdvancedSearchBarMobileProps = {
  onSearchSubmit?: (value: SearchParams) => void;
  onClearFilter?: (value: SearchParams) => void;
};

const AdvancedSearchBarMobile = ({
  onSearchSubmit,
  onClearFilter,
}: AdvancedSearchBarMobileProps) => {
  const { handleSubmit, reset, getValues } = useSearch<SearchParams>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<ActivityKeyword[]>([]);
  const [pictures, setPictures] = useState<ActivityPicture[]>([]);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleSearchSubmit = handleSubmit((data) => {
    onSearchSubmit?.(data);
  });

  const handleClearFilter: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    reset();
    const formData = getValues();
    onClearFilter?.(formData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger
        className={cn(
          'flex grow flex-row items-center justify-center gap-4',
          'bg-primary font-medium text-white'
        )}
      >
        <p>篩選條件</p>
      </DialogTrigger>
      <DialogContent hideCloseButton className="block h-svh w-screen">
        <form>
          <DialogHeader>
            <DialogTitle asChild className="flex items-end justify-between">
              <div>
                <H2 className="mb-1 ml-3 text-primary">篩選條件</H2>
                <DialogClose className="bg-primary p-7" onClick={() => {}}>
                  <XIcon className="size-6 stroke-white" />
                </DialogClose>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* TODO - Fixed the content height */}
          <section
            id="content"
            className="no-scrollbar max-h-[80vh] overflow-y-scroll px-3 py-10"
          >
            <SearchField name="keyword">
              {({ value, onChange }) => {
                return (
                  <AdvancedActivityMobileField
                    activityKeywords={keywords}
                    activityPictures={pictures}
                    isLoading={isLoading}
                    value={value}
                    onChange={(keyword) => {
                      setIsLoading(true);
                      getRecommendActivitiesByKeywordWithDebounce(keyword)
                        .then((response) => {
                          setKeywords(response.keyword);
                          setPictures(response.pictures);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                      onChange(keyword);
                    }}
                  />
                );
              }}
            </SearchField>

            <SearchField name="location">
              {({ value, onChange }) => {
                return (
                  <AdvancedLocationMobileField
                    locations={[
                      {
                        text: '北部',
                        endElement: <Checkbox />,
                      },
                      {
                        text: '中部',
                        endElement: <Checkbox />,
                      },
                      {
                        text: '南部',
                        endElement: <Checkbox />,
                      },
                      {
                        text: '東部',
                        endElement: <Checkbox />,
                      },
                      {
                        text: '離島',
                        endElement: <Checkbox />,
                      },
                    ]}
                    value={value}
                    onChange={(val) => {
                      onChange(val);
                      handleSearchSubmit();
                    }}
                  />
                );
              }}
            </SearchField>

            <SearchField name="category">
              {({ value, onChange }) => (
                <AdvancedCategoryMobileField
                  categories={[
                    {
                      text: '戶外踏青',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '社交活動',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '興趣嗜好',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '運動健身',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '健康生活',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '科技玩物',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '藝術文化',
                      endElement: <Checkbox />,
                    },
                    {
                      text: '遊戲',
                      endElement: <Checkbox />,
                    },
                  ]}
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <SearchField name="date">
              {({ value, onChange }) => (
                <AdvancedDateMobileField
                  dates={[
                    {
                      text: '即將開始',
                    },
                    {
                      text: '今天',
                    },
                    {
                      text: '明天',
                    },
                    {
                      text: '本周',
                    },
                    {
                      text: '下周',
                    },
                    {
                      text: '本周末',
                    },
                    {
                      text: '下一周',
                    },
                    {
                      text: '自訂日期',
                    },
                  ]}
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <SearchField name="type">
              {({ value, onChange }) => (
                <AdvancedEventTypeMobileField
                  events={[
                    {
                      text: '線上聚會',
                    },
                    {
                      text: '線下聚會',
                    },
                  ]}
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>
            <SearchField name="distance">
              {({ value, onChange }) => (
                <AdvancedDistanceMobileField
                  distances={[
                    {
                      text: '2公里',
                    },
                    {
                      text: '5公里',
                    },
                    {
                      text: '10公里',
                    },
                    {
                      text: '25公里',
                    },
                    {
                      text: '50公里',
                    },
                    {
                      text: '100公里',
                    },
                  ]}
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <SearchField name="sort">
              {({ value, onChange }) => (
                <AdvancedSortMobileField
                  value={value}
                  onChange={(val) => {
                    onChange(val);
                    handleSearchSubmit();
                  }}
                />
              )}
            </SearchField>

            <div
              id="show"
              className="flex flex-col items-start gap-4 px-3 py-6"
            >
              <H4>顯示</H4>
              <ToggleGroup
                disabled
                defaultValue="relative"
                type="single"
                className="relative flex w-full gap-0"
              >
                <ToggleGroupItem
                  value="relative"
                  aria-label="Toggle bold"
                  asChild
                  className={cn(
                    'h-12 w-full min-w-[163.5px] flex-1 rounded-l-[0.5rem] border-[1px] border-r-0 border-primary',
                    'font-bold',
                    'data-[state=on]:bg-primary data-[state=on]:text-white',
                    'data-[state=off]:bg-surface data-[state=off]:text-primary'
                  )}
                >
                  <button type="button">活動</button>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="date"
                  aria-label="Toggle underline"
                  asChild
                  className={cn(
                    'h-12 w-full min-w-[163.5px] flex-1 rounded-r-[0.5rem] border-[1px] border-l-0 border-primary',
                    'font-bold',
                    'data-[state=on]:bg-primary data-[state=on]:text-white',
                    'data-[state=off]:bg-surface data-[state=off]:text-primary'
                  )}
                >
                  <button type="button">團體</button>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </section>

          <DialogFooter className="absolute bottom-0 left-0 right-0 flex w-full flex-row bg-surface px-3 py-4 font-medium">
            <Button
              variant="ghost"
              onClick={handleClearFilter}
              className="flex flex-1 items-center justify-center"
            >
              清除條件
            </Button>
            <Button
              type="submit"
              className="min-w-[175.5px] flex-1"
              variant="default"
              onClick={(e) => {
                handleSearchSubmit(e);
                toggleDialog();
              }}
            >
              搜尋活動
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchBarMobile;
