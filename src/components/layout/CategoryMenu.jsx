import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCategoryMenuFromInstitutions } from "../../data/institutionsLoader";
import { slugifyCollegeType } from "../../data/institutionUtils";
import "../../styles/categoryMenu.css";

// Categories derived from Eng-institutions.json — no hardcoded college lists
const categoryDataFallback = [
  { name: "Engineering & Technology", slug: "engineering", colleges: [] },
];

const CategoryMenu = ({ categories: categoriesProp }) => {
  const categories = useMemo(
    () => categoriesProp ?? (getCategoryMenuFromInstitutions() || categoryDataFallback),
    [categoriesProp]
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [openMobileIndex, setOpenMobileIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const closeDropdown = useCallback(() => setActiveIndex(null), []);
  const leaveTimerRef = useRef(null);
  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    },
    [closeDropdown]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    return () => clearLeaveTimer();
  }, [clearLeaveTimer]);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      clearLeaveTimer();
      setActiveIndex(index);
    }
  };

  const handleMouseLeaveNav = useCallback(() => {
    if (!isMobile) {
      clearLeaveTimer();
      setActiveIndex(null);
    }
  }, [isMobile, clearLeaveTimer]);

  const handleMouseLeaveBar = useCallback(() => {
    if (isMobile) return;
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => setActiveIndex(null), 150);
  }, [isMobile, clearLeaveTimer]);

  const handleMouseEnterPanel = useCallback(() => {
    if (!isMobile) clearLeaveTimer();
  }, [isMobile, clearLeaveTimer]);

  const handleMouseLeavePanel = useCallback(() => {
    if (!isMobile) {
      clearLeaveTimer();
      setActiveIndex(null);
    }
  }, [isMobile, clearLeaveTimer]);

  const handleFocus = (index) => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleBlur = (e) => {
    if (!isMobile) {
      const relatedTarget = e.relatedTarget;
      const menuEl = e.currentTarget.closest(".category-mega-menu");
      if (!menuEl?.contains(relatedTarget)) {
        closeDropdown();
      }
    }
  };

  const toggleMobileAccordion = (index) => {
    setOpenMobileIndex((prev) => (prev === index ? null : index));
  };

  const activeCategory = activeIndex !== null ? categories[activeIndex] : null;
  const hasGroups = activeCategory?.groups && activeCategory.groups.length > 0;
  const [hoveredGroupIndex, setHoveredGroupIndex] = useState(null);
  const selectedGroupIndex = hoveredGroupIndex ?? (hasGroups ? 0 : null);
  const selectedGroup = hasGroups && selectedGroupIndex != null ? activeCategory.groups[selectedGroupIndex] : null;

  useEffect(() => {
    setHoveredGroupIndex(null);
  }, [activeIndex]);

  const handlePanelMouseLeave = useCallback(() => {
    setHoveredGroupIndex(null);
  }, []);

  return (
    <nav
      className="category-mega-menu"
      aria-label="College categories submenu"
      onMouseLeave={handleMouseLeaveNav}
    >
      <div
        className="category-submenu-bar"
        onMouseLeave={handleMouseLeaveBar}
      >
        <div className="category-submenu-scroll">
          <ul className="category-submenu-list" role="menubar">
            {categories.map((category, index) => {
              const isActive = activeIndex === index;
              const isMobileOpen = openMobileIndex === index;
              const catHasGroups = category.groups && category.groups.length > 0;

              return (
                <li
                  key={category.slug}
                  className="category-submenu-item"
                  role="none"
                >
                  <button
                    type="button"
                    className={`category-submenu-trigger ${isActive ? "category-submenu-trigger--active" : ""}`}
                    role="menuitem"
                    aria-expanded={isMobile ? isMobileOpen : isActive}
                    aria-haspopup="true"
                    aria-controls={`category-dropdown-${category.slug}`}
                    id={`category-trigger-${category.slug}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    onClick={() => isMobile && toggleMobileAccordion(index)}
                  >
                    {category.name}
                  </button>

                  {/* Mobile: inline accordion panel */}
                  {isMobile && (
                    <div
                      id={`category-dropdown-${category.slug}`}
                      className={`category-dropdown-panel category-dropdown-panel--mobile ${
                        isMobileOpen ? "category-dropdown-panel--mobile-open" : ""
                      }`}
                      role="menu"
                      aria-labelledby={`category-trigger-${category.slug}`}
                    >
                      <div className="category-dropdown-content">
                        {catHasGroups ? (
                          <div className="category-dropdown-by-type">
                            {category.groups.map((grp, gIdx) => {
                              const typeSlug = slugifyCollegeType(grp.collegeType);
                              const typeUrl = typeSlug ? `/colleges/${category.slug}/${typeSlug}` : null;
                              return (
                              <div key={grp.collegeType} className="category-college-type-block">
                                {typeUrl ? (
                                  <Link to={typeUrl} className="category-college-type-label category-college-type-label--link" onClick={closeDropdown}>
                                    {grp.collegeType}
                                  </Link>
                                ) : (
                                  <div className="category-college-type-label">{grp.collegeType}</div>
                                )}
                                <div className="category-dropdown-grid">
                                  {grp.colleges.map((college) => (
                                    <NavLink
                                      key={college.slug}
                                      to={`/colleges/${category.slug}/${college.slug}`}
                                      className={({ isActive }) =>
                                        `category-dropdown-link${isActive ? " category-dropdown-link--active" : ""}`
                                      }
                                      role="menuitem"
                                      onClick={closeDropdown}
                                    >
                                      {college.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="category-dropdown-grid">
                            {category.colleges.map((college) => (
                              <NavLink
                                key={college.slug}
                                to={`/colleges/${category.slug}/${college.slug}`}
                                className={({ isActive }) =>
                                  `category-dropdown-link${isActive ? " category-dropdown-link--active" : ""}`
                                }
                                role="menuitem"
                                onClick={closeDropdown}
                              >
                                {college.name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Desktop: full-width dropdown panel below submenu bar */}
      {!isMobile && activeCategory && (
        <div
          className="category-dropdown-panel category-dropdown-panel--desktop category-dropdown-panel--open"
          role="menu"
          aria-labelledby={`category-trigger-${activeCategory.slug}`}
          onMouseEnter={handleMouseEnterPanel}
          onMouseLeave={handleMouseLeavePanel}
        >
          <div className="category-dropdown-content">
            {hasGroups ? (
              <div className="category-dropdown-two-level">
                <nav className="category-college-types-nav" aria-label="College type">
                  {activeCategory.groups.map((grp, gIdx) => {
                    const typeSlug = slugifyCollegeType(grp.collegeType);
                    const typeUrl = typeSlug ? `/colleges/${activeCategory.slug}/${typeSlug}` : null;
                    return typeUrl ? (
                      <Link
                        key={grp.collegeType}
                        to={typeUrl}
                        className={`category-college-type-trigger ${selectedGroupIndex === gIdx ? "category-college-type-trigger--active" : ""}`}
                        onMouseEnter={() => setHoveredGroupIndex(gIdx)}
                        onClick={closeDropdown}
                      >
                        {grp.collegeType}
                        <span className="category-college-type-count">({grp.colleges.length})</span>
                      </Link>
                    ) : (
                      <button
                        key={grp.collegeType}
                        type="button"
                        className={`category-college-type-trigger ${selectedGroupIndex === gIdx ? "category-college-type-trigger--active" : ""}`}
                        onMouseEnter={() => setHoveredGroupIndex(gIdx)}
                        onClick={() => setHoveredGroupIndex(gIdx)}
                      >
                        {grp.collegeType}
                        <span className="category-college-type-count">({grp.colleges.length})</span>
                      </button>
                    );
                  })}
                </nav>
                <div className="category-colleges-for-type">
                  {selectedGroup && (
                    <>
                      <h3 className="category-colleges-type-heading">{selectedGroup.collegeType}</h3>
                      <div className="category-dropdown-grid">
                        {selectedGroup.colleges.map((college) => (
                          <NavLink
                            key={college.slug}
                            to={`/colleges/${activeCategory.slug}/${college.slug}`}
                            className={({ isActive }) =>
                              `category-dropdown-link${isActive ? " category-dropdown-link--active" : ""}`
                            }
                            role="menuitem"
                            onClick={closeDropdown}
                          >
                            {college.name}
                          </NavLink>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="category-dropdown-grid">
                {activeCategory.colleges.map((college) => (
                  <NavLink
                    key={college.slug}
                    to={`/colleges/${activeCategory.slug}/${college.slug}`}
                    className={({ isActive }) =>
                      `category-dropdown-link${isActive ? " category-dropdown-link--active" : ""}`
                    }
                    role="menuitem"
                    onClick={closeDropdown}
                  >
                    {college.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CategoryMenu;
