package com.mustafa.fullstackbackend.repository;


import com.mustafa.fullstackbackend.model.Directory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {
    @Query("SELECT d FROM Directory d " +
            "JOIN User u ON d.ownerUserID = u.userId WHERE u.userId = :userId")
    List<Directory> getDirectoriesFromUser(@Param("userId") Long userId);

    List<Directory> getDirectoriesByOwnerUserID(Long userId);

    Directory findByOwnerUserIDAndParentDirectoryId(long ownerId, long parentDirectoryId);

    List<Directory> getDirectoriesByOwnerUserIDAndParentDirectoryId(Long ownerUserId, Long parentDirectoryId);

    @Query("SELECT d from Directory d join Sharing s on d.directoryId=s.directoryId where s.userId=:userId")
    List<Directory> getSharedDirectoriesOfUser(Long userId);
}
